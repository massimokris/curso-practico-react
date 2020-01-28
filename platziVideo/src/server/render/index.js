import dotenv from "dotenv";
import getManifest from "../utils/getManifest";

dotenv.config();
const isProd = process.env.NODE_ENV === "production";
let files = {};

isProd
  ? (files = getManifest())
  : (files = {
      "main.css": "assets/app.css",
      "main.js": "assets/app.js",
      "vendors.js": "assets/vendors.js"
    });

const render = (html, preloadedState) => {
  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="${
            files["main.css"]
          }" type="text/css"></link>
          <title>Platzi Video</title>
      </head>
      <body>
          <section id="app">${html}</section>
          <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            "\\u003c"
          )}
        </script>
          <script src=${files["main.js"]} type"text/javascript"></script>
          <script src=${files["vendors.js"]} type"text/javascript"></script>
      </body>
    </html>
  `;
};

export default render;
