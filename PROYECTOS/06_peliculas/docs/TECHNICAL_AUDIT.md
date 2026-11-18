# PeliculasApp technical audit

Baseline: Angular 10.0.14, CLI 10.0.8, TypeScript 3.9, RxJS 6, Swiper 6, Protractor and TSLint. Existing routes: home, buscar/:texto, pelicula/:id. TMDB v3 provides now playing, search, details and credits. Preserve dark visual identity and Spanish UI.

## Findings
- A hardcoded TMDB key exists in the public history. Revoke and replace it; never print it or rewrite history without authorization.
- The pagination loading flag is reset only on success; errors can permanently block loading.
- Search subscriptions can race; use switchMap and lifecycle cleanup.
- Amplify config lacks build commands and correct artifact directory.
- Legacy dependencies and CDN assets need replacement.

## Strategy
Migrate to a supported Angular workspace with compatible Node/TypeScript versions, preserve routes and behavior, implement a constrained Cloudflare Worker proxy, deterministic unit and Playwright tests, and CI. Default localization es-MX and MX region. No paid services or automatic production deploy. Keep main untouched.

## Validation status
Static review only. No build, dependency scan, live TMDB call or automated tests executed yet.

## Architecture decision
The project owner elected to retain the existing browser-side TMDB v3 key and direct API access for now. The proxy is removed. This key is publicly visible and may be abused or revoked; its live validity has not been verified. Prefer static hosting and mocked CI tests without new credentials.
