# Cyprus Water Filter

Complete backup of the Homewater water filter website, saved on 28 October 2026.

## Website source

Download and extract `cyprus-water-filter-source.zip` to access the complete runnable project. The archive contains 136 files, including source code, product images, videos, certificates, translations, configuration, the dependency lockfile, and local setup instructions.

Dependencies, build output, environment files, and local caches are excluded. The archive includes the latest local certificate and navigation changes.

## Run the extracted project

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

For a production build:

```sh
npm run build
npm run start
```

See the README inside the archive for the full project structure and business configuration details. The site retains its existing Sites integration and Cloudflare/Vinext setup.

This repository currently stores the project as an archive. Extract it before editing the source, or extract and commit its contents to the repository to manage source files individually. Saving this backup does not configure deployments or change the live website.
