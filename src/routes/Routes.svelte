<script lang="ts">
  import { Route } from "svelte-navigator";

  import Home from "@Src/pages/Home.svelte";
  import DemoCytoscape from "@Src/pages/DemoCytoscape.svelte";
  import NotFound from "@Src/pages/NotFound.svelte";
  import Contact from "@Src/pages/Contact.svelte";
  import FlexHeightRoutes from "@Src/routes/FlexHeightRoutes.svelte";
  import ScreenHeightRoutes from "@Src/routes/ScreenHeightRoutes.svelte";
</script>

<main class="w-full">
  <Route path="/">
    <FlexHeightRoutes component="{Home}" />
  </Route>
  <Route path="/graph">
    <ScreenHeightRoutes component="{DemoCytoscape}" />
  </Route>
  <Route path="/contact">
    <FlexHeightRoutes component="{Contact}" />
  </Route>
  <Route path="/*">
    <FlexHeightRoutes component="{NotFound}" />
  </Route>
</main>
