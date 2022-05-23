<script lang="ts">
  import { Router } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Routes from "./components/Routes.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { Context } from "./tools/context";
  import type { CandyData } from "./types/candyData";
  import "@candy-doc/ui/src/components/Topbar/Topbar";

  const candyData = writable<CandyData>([]);
  setContext(Context.CandyData, candyData);

  async function fetchCandyData() {
    const response = await fetch("/candy-data.json");
    const bodyJSON: CandyData = await response.json();
    $candyData = bodyJSON;
  }
  fetchCandyData();
</script>

<Router>
  <div class="min-h-screen flex flex-col">
    <candy-topbar></candy-topbar>
    <div class="flex flex-1">
      <div class="w-1/6">
        <Navbar />
      </div>
      <div class="w-5/6">
        <Routes />
      </div>
    </div>
  </div>
</Router>
