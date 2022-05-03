<script lang="ts">
  import { Route } from "svelte-navigator";
  import CandyData from "@Src/static/candy-data.json";
  import Home from "@Src/pages/Home.svelte";
  import slugify from "slugify";
</script>

<main class="col-span-2">
  <div class="p-6">
    <Route path="/">
      <Home />
    </Route>
    {#each CandyData as boundedContext}
      <Route path="{slugify(boundedContext.name, { lower: true, strict: true, trim: true })}">
        <div class="prose">
          <h2>{boundedContext.name}</h2>
          <p>{boundedContext.description}</p>
        </div>
      </Route>
    {/each}
  </div>
</main>
