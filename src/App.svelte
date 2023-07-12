<script lang="ts">
  import { Router } from "svelte-navigator";

  import Topbar from "@Src/components/Topbar.svelte";
  import Routes from "./components/routes/Routes.svelte";
  import "@candy-doc/ui/src/components/Topbar";
</script>

<Router>
  <div class="min-h-screen flex flex-col">
    <Topbar />
    <div class="flex flex-1 h-full">
      <Routes />
    </div>
  </div>
</Router>
