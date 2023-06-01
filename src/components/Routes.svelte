<script lang="ts">
  import { Route } from "svelte-navigator";

  import Home from "@Src/pages/Home.svelte";
  import DemoCytoscape from "@Src/pages/DemoCytoscape.svelte";
  import GraphSidebar from "@Src/components/GraphSidebar.svelte";
  import DocSidebar from "@Src/components/DocSidebar.svelte";
</script>

<main class="pb-3 pr-3 flex-1 w-full">
  <Route path="/">
    <div class="flex h-full">
      <div class="w-1/6">
        <DocSidebar />
      </div>
      <div class="w-5/6 bg-white rounded-xl shadow-lg">
        <Home />
      </div>
    </div>
  </Route>
  <Route path="/demo-cytoscape">
    <div class="flex h-full">
      <div class="w-1/6">
        <GraphSidebar />
      </div>
      <div class="w-5/6 bg-white h-full rounded-xl shadow-lg">
        <DemoCytoscape />
      </div>
    </div>
  </Route>
</main>