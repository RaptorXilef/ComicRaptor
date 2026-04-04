/**
 * @file purgecss.config.js
 * @description Entfernt ungenutztes CSS basierend auf dem PHP/JS-Inhalt.
 */
export default {
    content: [
        "./public/**/*.php",
        "./resources/js/**/*.js",
        "./src/**/*.php",
        "./templates/**/*.php",
    ],
    css: ["./public/assets/css/main.min.css"],
    safelist: {
        standard: ["active", "show", "is-visible", "is-loading", "theme-night"],
        greedy: [/js-/, /swiper-/, /lightbox-/, /summernote-/],
    },
    output: "./public/assets/css/main.min.css",
};
