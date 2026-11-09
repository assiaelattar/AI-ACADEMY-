# Future Makers

French agency portfolio inspired by the visual direction of helloupdigital.com, adapted with original Future Makers copy and CSS artwork.

## Run locally

Requires Node.js. No dependency installation is needed.

```sh
npm run dev
```

Open http://127.0.0.1:4173.

## Build and deploy

```sh
npm run build
npx vercel deploy --prod
```

Vercel configuration builds the site into `dist`. Sign in to the intended Vercel account before deployment.

## Content

- `index.html`: page structure, French copy, contact links.
- `style.css`: responsive layout, original CSS planets and visual identity.
- `app.js`: six services, seven projects with development status, team, portfolio filters, studio previews and dialogs.
- Enquiries open the visitor's email application with `collab@makerlab.academy` as recipient. No message is submitted or stored by the website.
- Studio examples are illustrative interface previews, not live generative AI tools.
- Portfolio art is illustrative, not screenshots of the actual products.
- Stats, team and project scope are based on the supplied Future Makers dossier. No third-party client logos or testimonials are used.
- Fonts are loaded from Google Fonts with system fallbacks.

## Verification

Build and JavaScript syntax checks passed. Browser checks covered studio tab switching, portfolio category filtering, project dialogs, desktop layout, 390px mobile layout, navigation menu, horizontal overflow and console errors.
