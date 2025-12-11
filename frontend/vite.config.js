// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';

// // export default defineConfig({
// //   plugins: [react()],
// //   build: {
// //     outDir: 'dist'
// //   },
// //   server: {
// //     open: true
// //   },
// //   resolve: {
// //     alias: {
// //       '@': '/src',
// //     },
// //   }
// // });


// // vite.config.js
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import history from "connect-history-api-fallback";

// export default defineConfig({
//   plugins: [
//     react(),
//     // small plugin to attach history fallback middleware in dev
//     {
//       name: "spa-fallback",
//       configureServer(server) {
//         // use the middleware before other middlewares
//         server.middlewares.use(
//           history({
//             // keep query params and hash intact; rewrite all to index.html
//             // you can add rewrites if you want specific regex -> index.html rules
//             rewrites: [
//               { from: /\/chat($|\/)/, to: "/index.html" },
//               { from: /\/about($|\/)/, to: "/index.html" },
//               { from: /\/.*$/, to: "/index.html" }, // generic fallback
//             ],
//           })
//         );
//       },
//     },
//   ],
//   build: {
//     outDir: "dist",
//   },
//   server: {
//     open: true,
//     port: 5173,
//   },
//   resolve: {
//     alias: {
//       "@": "/src",
//     },
//   },
// });




// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import history from "connect-history-api-fallback";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "spa-fallback-safe",
      configureServer(server) {
        // create the history middleware
        const historyMiddleware = history({
          index: "/index.html",
          // do not modify Accept headers etc.
          disableDotRule: true,
        });

        // our guard: run history middleware only for "navigation" requests
        server.middlewares.use((req, res, next) => {
          const url = req.url || "";

          // let Vite internal requests, HMR, static files pass through
          if (
            url.startsWith("/@vite") ||
            url.startsWith("/@react-refresh") ||
            url.startsWith("/__vite") ||
            url.startsWith("/src/") ||   // module import paths
            url.startsWith("/node_modules/") ||
            url.startsWith("/favicon.ico") ||
            url.includes(".") // has extension like .js .css .png .svg etc.
          ) {
            return next();
          }

          // otherwise use history fallback
          return historyMiddleware(req, res, next);
        });
      },
    },
  ],
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: "dist",
  },
});
