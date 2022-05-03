<script lang="ts">
  import { Router } from "svelte-navigator";
  import Navbar from "./components/Navbar.svelte";
  import Routes from "./components/Routes.svelte";
</script>

<Router>
  <div class="grid grid-cols-3">
    <Navbar />
    <Routes />
  </div>
</Router>
