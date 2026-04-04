/**
 * @file stylelint.config.js
 * @description SCSS-Qualitätssicherung für die ComicRaptor-Engine.
 */

export default {
    extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recess-order", // Erzwingt eine logische Reihenfolge der CSS-Eigenschaften
    ],
    plugins: ["stylelint-declaration-strict-value"],
    rules: {
        "alpha-value-notation": "number",
        "no-empty-source": null,
        "scss/at-rule-no-unknown": true,

        // Begrenzt die Verschachtelung, um die Spezifität niedrig zu halten
        "max-nesting-depth": [
            3,
            {
                ignorePseudoClasses: [
                    "hover",
                    "focus",
                    "&.theme-night",
                    "body.theme-night &",
                ],
            },
        ],

        // Erzwingt die Nutzung von Variablen für Design-Tokens
        "scale-unlimited/declaration-strict-value": [
            ["/color/", "font-family", "font-size", "font-weight", "spacing"],
            {
                ignoreValues: [
                    "0",
                    "/^\\d+(%|vw|vh)$/",
                    "inherit",
                    "transparent",
                    "initial",
                    "none",
                    "currentColor",
                    "light",
                    "dark",
                    "sans-serif",
                    "arial",
                ],
                disableFix: true,
                message:
                    "Bitte nutze eine SCSS-Variable für '${property}'. Hartcodierte Werte sind im ComicRaptor-Core nicht erlaubt.",
            },
        ],

        // Erzwingt BEM (Block Element Modifier) Namenskonvention
        "selector-class-pattern": [
            "^([a-z][a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$",
            {
                message:
                    "Klassennamen müssen dem BEM-Muster entsprechen (z.B. .block__element--modifier)",
            },
        ],
    },
    ignoreFiles: [
        "**/_palette.scss", // Enthält die Definitionen der hartcodierten Werte
        "vendor/**/*.scss",
        "public/assets/**/*.css",
    ],
};
