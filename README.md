# No-Build JS/TS Template

A minimal web setup with JavaScript and TypeScript and no bundler, no build step
and — as of Bun 1.4 — no dependencies either. The server is TypeScript, run
directly by Bun. Static assets are served as standard ES modules.

The whole server is a handful of lines: Bun 1.4's `dir:` route serves `public/`
with a directory index, correct content types, ETags with 304 replies and Range
requests, which is everything `express.static` was here for. That replaced
express, tsx, ts-node, nodemon and `@types/express` — six dependencies down to
two, which is what finally makes the name true.

## Getting Started

1. Install dependencies
   ```bash
   bun install
   ```
2. Start the development server
   ```bash
   bun start
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to see the demo page.

`PORT` overrides the port.

## Scripts

- `bun start` — run the server.
- `bun run dev` — the same, with `bun --hot` reloading on change.
- `bun run check` — type-check the project without emitting files.
- `bun run audit` — fail on a dependency with a high or critical advisory.

## Requirements

Bun 1.4 or newer: the `dir:` static route the server is built on landed in 1.4.

## License

MIT
