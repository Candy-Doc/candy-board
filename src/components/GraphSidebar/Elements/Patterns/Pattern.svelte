<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faLocation, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
  import { createEventDispatcher } from "svelte";

  export let pattern: patternType;

  type patternType = {
    name: string;
    children: Array<patternType>;
    id: string;
  };

  const dispatch = createEventDispatcher();
  let currentNodeIdHideSelected: string | undefined = undefined;

  const centerCameraOnNode = (patternId: string) => {
    dispatch("centerNode", {
      patternId: patternId,
    });
  };

  const hideNodeNeighbors = (e: Event, patternId: string) => {
    const args = {
      newPatternId: patternId,
      currentPatternId: currentNodeIdHideSelected,
    };
    currentNodeIdHideSelected = currentNodeIdHideSelected === patternId ? undefined : patternId;
    dispatch("hideNodeNeighbors", args);
  };
</script>

{#if pattern.children?.length > 0}
  <candy-accordion label="{`| ${pattern.name}`}">
    <button slot="options" on:click|stopPropagation="{() => centerCameraOnNode(pattern.id)}">
      <Fa icon="{faLocation}" />
    </button>
    <button slot="options" on:click|stopPropagation="{(e) => hideNodeNeighbors(e, pattern.id)}">
      <Fa icon="{currentNodeIdHideSelected === pattern.id ? faEyeSlash : faEye}" />
    </button>
    {#each pattern.children as childPattern}
      <svelte:self pattern="{childPattern}" on:centerNode />
    {/each}
  </candy-accordion>
{:else}
  <candy-sidebar-element label="{`| ${pattern.name}`}">
    <button slot="options" on:click|stopPropagation="{() => centerCameraOnNode(pattern.id)}">
      <Fa icon="{faLocation}" />
    </button>
    <button slot="options" on:click|stopPropagation="{(e) => hideNodeNeighbors(e, pattern.id)}">
      <Fa icon="{currentNodeIdHideSelected === pattern.id ? faEyeSlash : faEye}" />
    </button>
  </candy-sidebar-element>
{/if}
