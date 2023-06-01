<script lang="ts">
  import { Router } from "svelte-navigator";

  import Routes from "./components/Routes.svelte";
  import "@candy-doc/ui/src/components/Topbar";

</script>

<Router>
  <div class="min-h-screen flex flex-col">
    <candy-topbar></candy-topbar>
    <div class="flex flex-1 h-full">
      <Routes />
    </div>
  </div>
</Router>
