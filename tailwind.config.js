const tailwindConfig = require("@candy-doc/ui/tailwind.config.js");

tailwindConfig.content = ["./index.html", "./src/**/*.{js,ts,svelte}"];

module.exports = tailwindConfig;
