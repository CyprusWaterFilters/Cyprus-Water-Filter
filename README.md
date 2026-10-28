# Cyprus Water Filter

Homewater water filtration website, prepared for hosting on Vercel with Next.js, React, TypeScript, and Tailwind CSS.

## Local development

Use Node.js 22.x.

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run start
```

## Vercel

Framework preset: Next.js. Build command: `npm run build`. Install command: `npm install`. Use the project root as the Root Directory. No application environment variables, database, or external storage are required.

The source includes the homepage, product catalogue, certificates page, translations, all product imagery, hero videos, and certificate images. Cloudflare/Vinext build configuration has been replaced with standard Next.js configuration.

Configure the public business name, WhatsApp number, and service area in `lib/business.ts`. The WhatsApp number is currently blank. See `REVIEW-NOTES.md` and `HF2-IMAGE-NOTES.md` for the existing product and launch notes. Search indexing remains disabled in the existing site metadata.

## Preview and release workflow

Create a feature branch and open a pull request targeting `main`. When the GitHub repository is connected to Vercel, it automatically builds the branch as a separate Preview deployment. Share the preview URL with Max and wait for explicit approval before merging. With Git integration connected, a merge into `main` automatically builds and deploys Production.

Vercel project: `cyprus-water-filter`, team: `maximconstantinou14-2429s-projects`. Use repository root, Node.js 22.x, Next.js, `npm install`, and `npm run build`. Preview URLs may require signing in to Vercel. No application environment variables are required.
