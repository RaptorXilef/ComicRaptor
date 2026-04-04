# Contributing to ComicRaptor 🦖

Vielen Dank, dass du helfen möchtest, die ComicRaptor-Engine noch besser zu machen!
Um die "Perfection" des Codes zu erhalten, folge bitte diesem Workflow:

## 🛠️ Development Setup

1. Clone das Repo.
2. Führe `composer setup` aus (installiert PHP-Tools & Hooks).
3. Führe `npm install` und `npm run setup` aus.

## 📏 Coding Standards

Wir nutzen strikte Standards. Dein Code wird nur akzeptiert, wenn alle Checks grün sind:

* **PHP:** PER-CS (via `composer analyze:cs`)
* **Static Analysis:** PHPStan Level 6+ (`composer analyze:phpstan`)
* **JS/SCSS:** ESLint & Stylelint (`npm run analyze`)

## 🧪 Testing

Jeder neue Code benötigt Tests:

* Unit-Tests: `vendor/bin/phpunit --testsuite Unit`
* Mutation Testing: `vendor/bin/infection` (Ziel: Hohe MSI-Rate)

## 📝 Commits

Wir nutzen **Conventional Commits**.
Beispiel: `feat(core): add new panel rendering engine`

---
Copyright (c) 2026 Felix Maywald | RaptorXilef
