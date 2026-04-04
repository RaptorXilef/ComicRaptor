/**
 * @file postcss.config.js
 * @description Post-Processing für CSS (Autoprefixer & Minifizierung).
 */
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
    // Source-Maps im Production-Build deaktivieren wir hier,
    // da wir sie für das Debugging nur lokal brauchen.
    map: false,
    plugins: [
        autoprefixer,
        cssnano({
            preset: "default",
        }),
    ],
};
