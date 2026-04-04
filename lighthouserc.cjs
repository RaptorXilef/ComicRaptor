/**
 * @file .lighthouserc.cjs
 * @description Lighthouse CI Konfiguration für ComicRaptor UX-Metriken.
 */

module.exports = {
    ci: {
        collect: {
            // Startet den schlanken PHP-Server für den Audit
            startServerCommand: "php -S 127.0.0.1:8000 -t public",
            startServerReadyPattern: "Development Server",
            url: ["http://127.0.0.1:8000"],
            numberOfRuns: 3,
            settings: {
                // CI-optimierte Chrome-Flags
                chromeFlags:
                    "--no-sandbox --ignore-certificate-errors --disable-dev-shm-usage --disable-gpu",
                onlyCategories: [
                    "performance",
                    "accessibility",
                    "best-practices",
                    "seo",
                ],
            },
        },
        assert: {
            // Wir setzen die Messlatte für die Engine hoch!
            assertions: {
                "categories:performance": ["warn", { minScore: 0.85 }], // Von 0.7 auf 0.85 erhöht (Perfection!)
                "categories:accessibility": ["error", { minScore: 0.95 }], // Barrierefreiheit ist 2026 Pflicht
                "categories:best-practices": ["error", { minScore: 0.9 }],
                "categories:seo": ["error", { minScore: 0.9 }],
            },
        },
        upload: {
            // In der CI laden wir es hoch, lokal speichern wir es im .build Ordner
            target: "temporary-public-storage",
            outputDir: "./.build/reports/lighthouse",
        },
    },
};
