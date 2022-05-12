<script lang="ts">
  import { Router } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Routes from "./components/Routes.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { Context } from "./tools/context";
  import type { CandyData } from "./types/candyData";

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
  <div class="grid grid-cols-3">
    <Navbar />
    <Routes />
  </div>
</Router>
