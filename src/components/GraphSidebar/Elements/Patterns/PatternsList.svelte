<script lang="ts">
  import patterns from "@Src/tools/Cytoscape/cytoscapeJson/mk-pattern.json";
  import Pattern from "./Pattern.svelte";

  const patternList = patterns;
  let inputText = "";

  const handleInputChange = ({ target }: Event) => {
    const value = (target as HTMLInputElement).value;
    inputText = value;
  }

</script>

<div class="patterns-container">
  <div class="pb-1">
    <candy-input on:input={handleInputChange} value={inputText} label="" shortcut="" placeholder="Search pattern..."></candy-input>
  </div>
  {#each patternList as pattern}
    <Pattern pattern="{pattern}" on:centerNode on:hideNodeNeighbors />
  {/each}
</div>

<style>
  .patterns-container {
    max-width: 17rem;
  }
</style>
