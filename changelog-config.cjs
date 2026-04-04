/**
 * @file changelog-config.cjs
 * @description Konfiguration für das Mapping von Commits ins Changelog.
 */
module.exports = {
    parserOpts: {
        headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
        headerCorrespondence: ["type", "scope", "subject"],
    },
    writerOpts: {
        // Hier definieren wir die Reihenfolge der Sektionen im Changelog
        commitGroupsSort: (a, b) => {
            const order = [
                "🚀 Features",
                "🐛 Bug Fixes",
                "⚡ Performance",
                "⚙️ Refactoring",
                "💎 Styling",
                "🧪 Tests",
                "📚 Dokumentation",
                "🧹 Chore / Maintenance",
            ];
            return order.indexOf(a.title) - order.indexOf(b.title);
        },
        transform: (commit) => {
            const typeMap = {
                feat: "🚀 Features",
                fix: "🐛 Bug Fixes",
                perf: "⚡ Performance",
                refactor: "⚙️ Refactoring",
                style: "💎 Styling",
                test: "🧪 Tests",
                docs: "📚 Dokumentation",
                chore: "🧹 Chore / Maintenance",
            };

            if (!commit.type || !typeMap[commit.type.toLowerCase()]) {
                return;
            }

            commit.type = typeMap[commit.type.toLowerCase()];

            if (typeof commit.hash === "string") {
                commit.shortHash = commit.hash.substring(0, 7);
            }

            return commit;
        },
    },
};
