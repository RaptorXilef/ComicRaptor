/**
 * @file prettier.config.js
 * @description Zentrale Formatierungs-Konfiguration für ComicRaptor.
 */

export default {
    // Erzwingt Linux-Zeilenumbrüche (LF), wichtig für Cross-Platform-Teams
    endOfLine: "lf",

    // Klassischer 4-Leerzeichen-Standard für bessere Lesbarkeit in PHP/JS
    tabWidth: 4,
    useTabs: false,

    // Semikolons und Single-Quotes für einen modernen, sauberen Look
    semi: true,
    singleQuote: true,

    // Kommas am Ende von Objekten/Arrays (wo in ES5 erlaubt)
    trailingComma: "es5",

    // Spezifische Overrides für Dateitypen, die weniger Platz brauchen
    overrides: [
        {
            files: ["*.json", "*.md", "*.yml", "*.yaml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
