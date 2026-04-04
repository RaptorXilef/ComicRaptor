/**
 * @file .pa11yci.js
 * @description Deep-Scan Barrierefreiheit für ComicRaptor (WCAG 2.1 AA).
 */

export default {
    defaults: {
        chromeLaunchConfig: {
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
            ],
        },
        // Nutzt den HTML CodeSniffer für detaillierte Berichte
        runners: ["htmlcs"],
        // Der professionelle Goldstandard für 2026
        standard: "WCAG2AA",
        reporters: [
            "cli",
            [
                "json",
                {
                    output: "./.build/reports/pa11y/report.json",
                },
            ],
        ],
        ignore: [
            // Hier können wir später bekannte, unvermeidbare Drittanbieter-Fehler ignorieren
        ],
        // Timeout erhöhen, falls der PHP-Server unter Last langsam reagiert
        timeout: 30000,
    },
    urls: ["http://127.0.0.1:8000"],
};
