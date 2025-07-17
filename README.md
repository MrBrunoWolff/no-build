# No-Build JS/TS Template

This project demonstrates a minimal web setup with JavaScript and TypeScript without bundling or build steps. The server is written in TypeScript and executed directly using `ts-node`. Static assets are served as standard ES modules.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm start
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to see the demo page.

## Scripts

- `npm start` - run the server with `ts-node`.
- `npm run dev` - watch for changes using `nodemon`.
- `npm run check` - type-check the project without emitting files.

## License

MIT
