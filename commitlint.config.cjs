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
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "chore",
                "revert",
            ],
        ],
        "subject-case": [2, "always", "lower-case"],
        "subject-empty": [2, "never"],
        "type-empty": [2, "never"],
    },
};
