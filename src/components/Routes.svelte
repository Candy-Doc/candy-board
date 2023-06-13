<script lang="ts">
  import { Route } from "svelte-navigator";

  import Home from "@Src/pages/Home.svelte";
  import DemoCytoscape from "@Src/pages/DemoCytoscape.svelte";
  import NotFound from "@Src/pages/NotFound.svelte";
  import Contact from "@Src/pages/Contact.svelte";
</script>

<main class="pb-3 pr-3 flex-1 w-full">
  <Route path="/">
    <div class="h-full">
      <Home />
    </div>
  </Route>
  <Route path="/demo-cytoscape">
    <div class="h-full">
      <DemoCytoscape />
    </div>
  </Route>
  <Route path="/contact">
    <div class="h-full">
      <Contact />
    </div>
  </Route>
  <Route path="/*">
    <div class="h-full">
      <NotFound />
    </div>
  </Route>
</main>
