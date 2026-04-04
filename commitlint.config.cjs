/**
 * @file commitlint.config.cjs
 * @since 0.1.0
 * @description Erzwingt Conventional Commits 1.0.0.
 */
module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        // 0 = deaktiviert, 1 = Warnung, 2 = Fehler
        "body-max-line-length": [0, "always"],
        "footer-max-line-length": [0, "always"],

        "type-enum": [
            2,
            "always",
            [
                "feat", // Neue Features
                "fix", // Bugfixes
                "docs", // Dokumentation
                "style", // Formatierung (kein Code-Effekt)
                "refactor", // Refactoring
                "perf", // Performance-Verbesserungen
                "test", // Tests hinzufügen/korrigieren
                "build", // <--- JETZT ERLAUBT: Build-System, Dependencies (npm, sass, etc.)
                "ci", // <--- AUCH GUT: GitHub Actions, Scripte
                "chore", // Sonstiges (Wartung)
                "revert", // Rollbacks
            ],
        ],
        "subject-case": [2, "always", "lower-case"],
        "subject-empty": [2, "never"],
        "type-empty": [2, "never"],
    },
};
