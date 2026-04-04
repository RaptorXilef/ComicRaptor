<?php

// SPDX-License-Identifier: UNLICENSED

/**
 * Konfigurationsdatei für Rector PHP.
 *
 * Automatisiert die Code-Modernisierung und Refactoring-Prozesse, um den
 * PHP 8.4 Standard sowie höchste Typsicherheit zu gewährleisten.
 *
 * @file      rector.php
 * @since     2.0.0
 * - Initiales Setup für PHP 8.2 Migration.
 * @since     3.0.0
 * - Update auf PHP 8.4 Sets und PHPUnit 11 Vorbereitung.
 * @since     3.5.0
 * - refactor(config): Korrektur des PHPUnit-Namespaces und Entfernung redundanter Regeln.
 * - chore(config): Migration auf Rector 2.x Monorepo-Struktur.
 * - refactor(config): Nutzung nativer PHPUnit-Sets zur Vermeidung von Paket-Konflikten.
 * - fix(config): Korrektur des Namespaces für PreferPHPUnitThisCallRector (Class_).
 * - chore(config): Delegation des Assertion-Styles an PHP-CS-Fixer zur Stabilisierung.
 */

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\PHPUnit\Set\PHPUnitSetList;
use Rector\Set\ValueObject\LevelSetList;
use Rector\Set\ValueObject\SetList;
use Rector\TypeDeclaration\Rector\Property\TypedPropertyFromStrictConstructorRector;

return static function (RectorConfig $rectorConfig): void {
    // 1. Pfade definieren
    $rectorConfig->paths([
        __DIR__ . '/src',
        __DIR__ . '/tests',
        __DIR__ . '/public', // Auch hier kann PHP-Logik stecken
        __DIR__ . '/bootstrap',
        __DIR__ . '/config',
    ]);

    $rectorConfig->autoloadPaths([
        __DIR__ . '/vendor/autoload.php',
    ]);

    // 2. Regel-Sets für High-End Qualität
    $rectorConfig->sets([
        // Aktualisiert Code auf PHP 8.3/8.4 Standard (Attributes, Readonly, etc.)
        LevelSetList::UP_TO_PHP_84,           // Volle PHP 8.4 Power
        SetList::DEAD_CODE,                   // Entfernt unnötigen Ballast
        SetList::CODE_QUALITY,                // Schreibt sauberen Code
        SetList::TYPE_DECLARATION,            // Maximale Typsicherheit (hilft PHPStan Level max)
        SetList::PRIVATIZATION,               // Macht alles privat, was nicht öffentlich sein muss
        SetList::INSTANCEOF,                  // Modernisiert instanceof-Prüfungen

        // PHPUnit 11 & Attribute-Migration
        PHPUnitSetList::PHPUNIT_110,
        PHPUnitSetList::ANNOTATIONS_TO_ATTRIBUTES,
        PHPUnitSetList::PHPUNIT_CODE_QUALITY,
    ]);

    // 3. Einzelregeln (Explizit für strikte Konstruktoren)
    $rectorConfig->rule(TypedPropertyFromStrictConstructorRector::class);
    $rectorConfig->rule(\Rector\TypeDeclaration\Rector\StmtsAwareInterface\DeclareStrictTypesRector::class);

    // 4. Code-Stil während des Umbaus
    $rectorConfig->importNames();             // Ersetzt \App\Service\Cool durch use App\Service\Cool;
    $rectorConfig->importShortClasses(false); // Verhindert Namenskollisionen

    // 5. Performance & Cache
    $rectorConfig->parallel();                // Nutzt alle Kerne (wie dein PHPCS/PHPStan)
    $rectorConfig->cacheDirectory('.cache/rector');

    // Wir blockieren die Regel, die dich sabotiert, mit dem von dir gefundenen Pfad
    $rectorConfig->skip([
        // Korrekter Pfad für PHPUnit Regeln
        'Rector\PHPUnit\CodeQuality\Rector\Class_\PreferPHPUnitThisCallRector',

        // Verhindert das Löschen der Konstruktor-Parameter (Named Arguments Fix)
        'Rector\DeadCode\Rector\ClassMethod\RemoveUnusedPromotedPropertyRector',

        // Verhindert das "Narrowing" (Löschen) von Properties in Tests
        // 'Rector\Php80\Rector\Class_\NarrowUnusedSetUpDefinedPropertyRector',

        // Verhindert das Löschen von eigentlich benötigten Imports
        \Rector\PostRector\Rector\UnusedImportRemovingPostRector::class,

        // DIESE REGEL VERHINDERT, DASS RECTOR DEIN MOCKING KAPUTT MACHT:
        // Sie verhindert 'use function ...', was das Shadowing-Mocking ermöglicht.
        // Verhindert, dass Rector 'use function' einfügt und das Mocking hebelt
        \Rector\PostRector\Rector\NameImportingPostRector::class => [
            __DIR__ . '/src/Security/StructuredSecurityAuditLoggingService.php',
            __DIR__ . '/src/InputOutput/PersistentPendingStorageService.php',
        ],
    ]);
};
