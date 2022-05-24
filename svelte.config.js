const sveltePreprocess = await import("svelte-preprocess");

module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess.preprocess(),
};
