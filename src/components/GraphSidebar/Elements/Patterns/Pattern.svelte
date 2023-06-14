<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faLocation, faEye } from "@fortawesome/free-solid-svg-icons";
  import { createEventDispatcher } from "svelte";

  export let pattern: patternType;

  type patternType = {
    name: string;
    children: Array<patternType>;
    id: string;
  };

  const dispatch = createEventDispatcher();

  const centerCameraOnNode = (patternId: string) => {
    dispatch("centerNode", {
      patternId: patternId,
    });
  };
</script>

{#if pattern.children?.length > 0}
  <candy-accordion label="{`| ${pattern.name}`}">
    <button slot="options" on:click|stopPropagation="{() => centerCameraOnNode(pattern.id)}">
      <Fa icon="{faLocation}" />
    </button>
    <span slot="options">
      <Fa icon="{faEye}" />
    </span>
    {#each pattern.children as childPattern}
      <svelte:self pattern="{childPattern}" on:centerNode />
    {/each}
  </candy-accordion>
{:else}
  <candy-sidebar-element label="{`| ${pattern.name}`}">
    <button slot="options" on:click|stopPropagation="{() => centerCameraOnNode(pattern.id)}">
      <Fa icon="{faLocation}" />
    </button>
    <span slot="options">
      <Fa icon="{faEye}" />
    </span>
  </candy-sidebar-element>
{/if}
