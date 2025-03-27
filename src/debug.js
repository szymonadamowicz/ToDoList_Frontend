const fg = require("fast-glob");
const path = require("path");

(async () => {
    const files = await fg(["src/**/*.{js,jsx,ts,tsx}"], { cwd: __dirname });
    console.log("Znalezione pliki:", files);
})();