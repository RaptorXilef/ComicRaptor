import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Sagt Vitest, wo die Tests liegen (passe den Pfad an, falls nötig)
    include: [
      "resources/js/**/*.{test,spec}.js",
      "tests/Unit/JS/**/*.{test,spec}.js",
    ],
    // Verhindert, dass Vitest in PHP-Ordnern oder Vendor-Leichen sucht
    exclude: ["**/node_modules/**", "**/vendor/**", "**/.git/**"],
    globals: true,
    environment: "jsdom", // Falls du DOM-Manipulationen (Sass/UI) testest
    coverage: {
      provider: "v8", // Nutzt das installierte v8 Paket
      reporter: ["text", "json", "html"], // Text für Konsole, HTML für Browser
      // Erfasst alle JS-Dateien in resources/js, ignoriert aber Test-Dateien selbst
      include: ["resources/js/**/*.js"],
      exclude: ["resources/js/**/*.test.js", "resources/js/vendor/**"],
      all: true, // Auch ungetestete Dateien einbeziehen
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 85,
        statements: 90,
      },
    },
  },
});
