# D-SIGN DESIGNERS — Vercel Web Analytics (v3.2)

This React + Vite application now integrates the official **Vercel Web Analytics** package. It measures page views and visitors on the deployed website through your Vercel project's Analytics dashboard. The site remains a React/Vite SPA; do **not** choose the Next.js example from the dashboard screenshot.

## Changes included

- `package.json`: adds `@vercel/analytics` version `^2.0.1`.
- `src/main.jsx`: imports `{ Analytics }` from `@vercel/analytics/react` and mounts `<Analytics />` once, alongside the root `<App />`.
- No Next.js dependency, manual script snippet, API key, or environment variables are required.
- The original ambient music and speaker control remain unchanged.

## Enable and deploy

1. Open your Vercel project dashboard, go to **Analytics**, then choose **Enable** if Analytics is not already enabled.
2. From your local project root in PowerShell, run:

   ```powershell
   npm.cmd install
   npm.cmd run check:assets
   npm.cmd run build
   ```

3. Commit and push the updated code to the Git repository linked to Vercel, or redeploy with the Vercel CLI. In your Vercel build settings, use the **Vite** framework, `npm run build` and the `dist` output directory.
4. Visit the newly deployed **production URL** in a browser. Navigate between your site and reload a page; this single-page website primarily tracks the `/` page (section anchors such as `#services` are not separate pages).
5. In DevTools → **Network**, look for a Web Analytics `view` request sent to an endpoint under `/_vercel/insights/` or the configured Vercel analytics path. The path can vary by deployment. Then check **Project → Analytics** for visitor/page-view activity.

**Important:** The Vercel Analytics toggle must be enabled in the project's dashboard; adding code without this step may not result in data collection. Some tracking protection tools can block requests, and metrics may not populate instantly. Browser code and Vercel deployment cannot be verified by this offline patch alone.

## Security and privacy

- This patch does not track quote form field values, WhatsApp message contents, or other personal input.
- Before public launch, review the published privacy notice to accurately explain analytics and data-processing practices as appropriate to your audience and jurisdiction.
- Vercel Web Analytics is separate from Vercel Speed Insights and is not Google Analytics.

## Official references

- https://vercel.com/docs/analytics/quickstart
- https://vercel.com/docs/analytics/package
- https://vercel.com/docs/analytics/troubleshooting
