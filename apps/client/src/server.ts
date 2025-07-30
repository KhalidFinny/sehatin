import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from "@angular/ssr/node";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import express, { Request, Response } from "express";

const browserDistFolder = join(dirname(fileURLToPath(import.meta.url)), "../browser");
const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Serve static files from /browser
 */
app.use(express.static(browserDistFolder, {
  maxAge: "1y",
  index: false,
  redirect: false,
}));

/**
 * Parse incoming requests as JSON
 */
app.use(express.json());

/**
 * Handle all other requests by rendering the Angular application
 */
app.use("/**", (req, res, next) => {
  angularApp.handle(req).then((response) => response ? writeResponseToNodeResponse(response, res) : next()).catch(next);
});

/**
 * Start the server
 */
if (isMainModule(import.meta.url)) {
  const port = process.env["PORT"] || 4000;
  app.listen(port, () => console.log(`Node Express server listening on http://localhost:${port}`));
}

export const reqHandler = createNodeRequestHandler(app);