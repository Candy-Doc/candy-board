<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
  import { createEventDispatcher } from "svelte";

  import type { IconOptionsDefinition } from "./types";

  export let label: string;
  export let icon: IconDefinition;
  export let iconOptions: Array<IconOptionsDefinition> | undefined = undefined;
  export let isCollapsed: boolean;

  const dispatch = createEventDispatcher();
  let isActive = false;
  let isLegendSticky = false;

  const handleAccordion = () => {
    if (isCollapsed) {
      dispatch("collapse");
    }
    isActive = !isActive;
  };

  const handleSticky = () => {
    isLegendSticky = !isLegendSticky;
  };

  $: isCollapsed ? (isActive = false) : null;
</script>

<div class="{isLegendSticky ? 'sticky bottom-0 rounded-sm bg-[#f8f9fa]' : ''}">
  <candy-accordion
    label="{label}"
    active="{isActive}"
    on:onChange="{handleAccordion}"
    collapsed="{isCollapsed}"
  >
    {#if iconOptions}
      {#each iconOptions as option}
        <div slot="options">
          <button on:click|stopPropagation="{handleSticky}" data-testid="{label.toLowerCase()}-stick-button">
            <Fa icon="{isLegendSticky ? option.active : option.inactive}" />
          </button>
        </div>
      {/each}
    {/if}
    <div slot="icon">
      <Fa icon="{icon}" />
    </div>
    <slot />
  </candy-accordion>
</div>
