<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faLocation, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
  import { createEventDispatcher } from "svelte";
  import type { patternType } from "../../types";

  export let pattern: patternType;

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
  <!-- accordion -->
  <div class="{`flex ${pattern.classes}`}">
    <candy-accordion class="w-full" label="{`${pattern.name}`}" minimizeOptions={true}>
      <button slot="options" on:click|stopPropagation="{() => centerCameraOnNode(pattern.id)}">
        <Fa icon="{faLocation}" />
      </button>
      <button slot="options" on:click|stopPropagation="{(e) => hideNodeNeighbors(e, pattern.id)}">
        <Fa icon="{currentNodeIdHideSelected === pattern.id ? faEyeSlash : faEye}" />
      </button>
      {#each pattern.children as childPattern}
        <svelte:self pattern="{childPattern}" on:centerNode on:hideNodeNeighbors />
      {/each}
    </candy-accordion>
  </div>
{:else}
  <!-- sidebar-element -->
  <div class="{`flex ${pattern.classes}`}">
    <candy-sidebar-element class="w-full" label="{`${pattern.name}`}" minimizeOptions={true}>
      <button slot="options" on:click|stopPropagation="{() => centerCameraOnNode(pattern.id)}">
        <Fa icon="{faLocation}" />
      </button>
      <button slot="options" on:click|stopPropagation="{(e) => hideNodeNeighbors(e, pattern.id)}">
        <Fa icon="{currentNodeIdHideSelected === pattern.id ? faEyeSlash : faEye}" />
      </button>
    </candy-sidebar-element>
  </div>
{/if}

<style>
  candy-accordion::part(accordion-text),
  candy-sidebar-element::part(sidebar-element-text) {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .boundedContext > candy-accordion::part(accordion-button),
  .boundedContext > candy-sidebar-element::part(sidebar-element) {
    border: 1px solid black;
    border-style: dashed;
  }

  .aggregate > candy-accordion::part(accordion-button),
  .aggregate > candy-sidebar-element::part(sidebar-element) {
    background-color: #d1ece7;
  }

  .entity > candy-accordion::part(accordion-button),
  .entity > candy-sidebar-element::part(sidebar-element) {
    background-color: #fcf3cf;
  }

  .valueObject > candy-accordion::part(accordion-button),
  .valueObject > candy-sidebar-element::part(sidebar-element) {
    background-color: #d9f7a5;
  }

  .event > candy-accordion::part(accordion-button),
  .event > candy-sidebar-element::part(sidebar-element) {
    background-color: #f9dd9a;
  }

  .command > candy-accordion::part(accordion-button),
  .command > candy-sidebar-element::part(sidebar-element) {
    background-color: #adebff;
  }

  .service > candy-accordion::part(accordion-button),
  .service > candy-sidebar-element::part(sidebar-element) {
    background-color: #a3e4d7;
  }

  .repository > candy-accordion::part(accordion-button),
  .repository > candy-sidebar-element::part(sidebar-element) {
    background-color: #aed6f1;
  }

  .factory > candy-accordion::part(accordion-button),
  .factory > candy-sidebar-element::part(sidebar-element) {
    background-color: #f6ddcc;
  }
</style>
