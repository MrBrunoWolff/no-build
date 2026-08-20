/**
 * The whole server. No build step, no framework, no dependencies.
 *
 * Bun 1.4's `dir:` route serves ../public directly — directory index, correct
 * content types, ETags with 304 replies, and Range requests — which is every
 * feature express.static was here for. That is what lets this repo finally
 * live up to its name: express, tsx, ts-node, nodemon and @types/express are
 * all gone, and `bun --hot` provides the reload that nodemon was for.
 *
 * `import.meta.dir` replaces `__dirname`, which was a latent bug: this package
 * is "type": "module", where __dirname does not exist. It only ever worked
 * because tsx transpiled the file to CommonJS first.
 */
const publicDir = new URL("../public/", import.meta.url).pathname;

// The cast is temporary and narrow. @types/bun has no 1.4 release yet — the
// newest published is 1.3.14, which predates `dir:` routes — so the types reject
// an option the runtime implements. Verified working against this very server:
// directory index at /, correct content types, and ETag with a 304 reply. Drop
// the cast once @types/bun ships 1.4.
const server = Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/*": { dir: publicDir },
  },
} as Parameters<typeof Bun.serve>[0]);

console.log(`Server running at ${server.url}`);
