<?php

declare(strict_types=1);

namespace App\Scripts;

/**
 * Setup-Zentrale für die ComicRaptor Engine.
 * Übernimmt die Initialisierung der Umgebung und Tool-Pflege.
 */
class Setup
{
    private const DIRS = [
        '.cache/phpstan',
        '.cache/phpcs',
        '.cache/phpunit',
        '.cache/php-cs-fixer',
        'tools',
        '.build/reports'
    ];

    private const TOOLS = [
        'tools/infection.phar' => 'https://github.com/infection/infection/releases/latest/download/infection.phar',
        'tools/phpcpd.phar'    => 'https://phar.phpunit.de/phpcpd.phar',
    ];

    public static function init(): void
    {
        self::createDirectories();
        self::updateTools();
        echo "\n✅ Setup erfolgreich abgeschlossen.\n";
    }

    public static function createDirectories(): void
    {
        echo "📁 Erstelle Verzeichnisstruktur...\n";
        foreach (self::DIRS as $dir) {
            if (!is_dir($dir)) {
                if (mkdir($dir, 0777, true)) {
                    echo "   [OK] $dir\n";
                } else {
                    echo "   [FEHLER] Konnte $dir nicht erstellen!\n";
                }
            }
        }
    }

    public static function updateTools(): void
    {
        echo "🛠️  Aktualisiere PHAR-Tools...\n";
        foreach (self::TOOLS as $path => $url) {
            echo "   Lade " . basename($path) . "... ";
            if (@copy($url, $path)) {
                echo "Fertig.\n";
            } else {
                echo "Fehlgeschlagen! (Prüfe Internetverbindung)\n";
            }
        }
    }

    public static function clearBuild(): void
    {
        $path = 'public/dist';
        echo "🧹 Bereinige Build-Verzeichnis ($path)...\n";
        if (!is_dir($path)) return;

        $files = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST
        );

        foreach ($files as $fileinfo) {
            $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
            $todo($fileinfo->getRealPath());
        }
        echo "   Fertig.\n";
    }
}

// Direkter Aufruf durch Composer
if (php_sapi_name() === 'cli' && isset($argv[1])) {
    $action = $argv[1];

    // Wir nutzen match, fangen das Ergebnis aber nicht ab,
    // daher nutzen wir Funktionen/Methoden als Rückgabewerte.
    match ($action) {
        'init'  => Setup::init(),
        'clear' => Setup::clearBuild(),
        'up'    => Setup::updateTools(),
        default => print("Unbekannter Befehl: $action\n")
    };
}
