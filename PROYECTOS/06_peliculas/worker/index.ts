interface Env { TMDB_API_TOKEN: string; ASSETS: Fetcher }
const allowed = /^\/(?:movie\/(?:now_playing|popular|top_rated|upcoming|[1-9]\d{0,9}(?:\/(?:credits|videos|watch\/providers))?)|search\/movie|genre\/movie\/list)$/;
const headers = { 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' };
const error = (status: number, message: string) => new Response(JSON.stringify({error: message}), {status, headers});
export default {
 async fetch(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
  if (request.method !== 'GET') return error(405, 'Method not allowed');
  if (!url.pathname.startsWith('/api/tmdb/')) return error(404, 'Not found');
  const path = url.pathname.slice('/api/tmdb'.length);
  if (!allowed.test(path)) return error(404, 'Unsupported endpoint');
  const upstream = new URL('https://api.themoviedb.org/3' + path);
  upstream.searchParams.set('language', 'es-MX');
  if (/^\/movie\/(now_playing|popular|upcoming)$/.test(path)) upstream.searchParams.set('region','MX');
  for (const [key,value] of url.searchParams) {
   if (key === 'language' && value === 'es-MX') continue;
   if (key === 'page' && /^[1-9]\d{0,2}$/.test(value) && Number(value)<=500) { upstream.searchParams.set(key,value); continue; }
   if (key === 'query' && path === '/search/movie' && value.trim() && value.length<=200) { upstream.searchParams.set(key,value.trim()); continue; }
   return error(400,'Invalid parameter');
  }
  if (path === '/search/movie' && !upstream.searchParams.has('query')) return error(400,'Query required');
  if (!env.TMDB_API_TOKEN) return error(503,'Service not configured');
  try {
   const response = await fetch(upstream, {headers:{Authorization:'Bearer '+env.TMDB_API_TOKEN, Accept:'application/json'},signal:AbortSignal.timeout(8000),redirect:'error'});
   if (!response.ok) return error([404,429].includes(response.status)?response.status:502,'Movie service unavailable');
   return new Response(response.body,{headers});
  } catch { return error(502,'Movie service unavailable'); }
 }
};
