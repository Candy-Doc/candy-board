import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import alias from "@rollup/plugin-alias";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      extensions: [".svelte"],
      include: ["**/*.svelte", "**/*.ts"],
    }),
    alias({
      entries: [
        { find: /^@Src(\/|$)/, replacement: `${__dirname}/src/` },
        { find: /^@Public(\/|$)/, replacement: `${__dirname}/public/` },
      ],
    }),
  ],
});
