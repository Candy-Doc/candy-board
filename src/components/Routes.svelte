<script lang="ts">
  import { Route } from "svelte-navigator";
  import Home from "@Src/pages/Home.svelte";
  import slugify from "slugify";
  import { getContext } from "svelte";
  import { Context } from "@Src/tools/context";
  import type { WritableCandyData } from "@Src/types/candyData";

  const CandyData = getContext<WritableCandyData>(Context.CandyData);
</script>

<main>
  <div class="p-6">
    <Route path="/">
      <Home />
    </Route>
    {#each $CandyData as boundedContext}
      <Route path="{slugify(boundedContext.simpleName, { lower: true, strict: true, trim: true })}">
        <div class="prose">
          <h2>{boundedContext.simpleName}</h2>
          <p>{boundedContext.description}</p>
        </div>
      </Route>
    {/each}
  </div>
</main>
