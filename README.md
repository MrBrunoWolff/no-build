# No-Build JS/TS Template

A web template that serves standard JavaScript modules directly from public/, with a TypeScript server run by Bun and no application build step.

[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

## Quick start

Use Bun 1.4 or later for directory routes, with the version declared in [package.json](package.json) for development.

```sh
git clone https://github.com/MrBrunoWolff/no-build.git
cd no-build
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000). Set `PORT` to use another port.

## Features

- Browser JavaScript runs as standard ES modules.
- Bun serves static assets with content types, ETags and range requests.
- Server hot reloading and TypeScript checks without emitting files.

## Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `bun run start`    | Run the server                                  |
| `bun run dev`      | Run the server with hot reloading               |
| `bun run check`    | Type-check without emitting files               |
| `bun run audit`    | Audit dependencies                              |
| `bun run check:ci` | Run the complete repository validation contract |

## Development

Edit browser modules in `public/` and the server in `src/server.ts`. Browser assets must be JavaScript; Bun runs the server TypeScript directly. See [QUALITY.md](QUALITY.md) for validation and [bunfig.toml](bunfig.toml) for the three-day dependency release-age policy.

## License

MIT — see [LICENSE](LICENSE).
