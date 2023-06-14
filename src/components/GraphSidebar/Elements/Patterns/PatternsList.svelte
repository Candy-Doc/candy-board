<script lang="ts">
  import patterns from "@Src/tools/Cytoscape/cytoscapeJson/mk-pattern.json";
  import Pattern from "./Pattern.svelte";
</script>

{#each patterns as pattern}
  <Pattern pattern="{pattern}" on:centerNode on:hideNodeNeighbors />
{/each}
