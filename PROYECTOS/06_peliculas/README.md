# PeliculasApp

Spanish-language movie discovery portfolio application. Angular 21, Bootstrap 5, TMDB v3, Playwright. Direct browser API access uses the existing public repository key by owner decision.

## Local setup
Node 24: run `npm install`, `npm start`, `npm run build`, `npx playwright install chromium`, and `npm test`. Commit the newly generated package-lock.json after successful validation; subsequent installs should use npm ci.

## Deployment
Static hosting: build command npm run build, output dist/peliculasApp/browser. Cloudflare Pages free tier is the intended target. No backend required. The hash router supports static hosting. No deployment has been performed.

## Security
The existing TMDB key remains visible in client code and public history; rotate if abused or revoked. Do not add private secrets to the client.

## Validation
CI tests mock TMDB; they do not establish the live key's validity.
