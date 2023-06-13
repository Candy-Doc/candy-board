<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
  import { createEventDispatcher } from "svelte";

  export let label: string;
  export let icon: IconDefinition;
  export let isCollapsed: boolean;

  const dispatch = createEventDispatcher();
  let isActive = false;

  const handleAccordion = () => {
    if (isCollapsed) {
      dispatch("collapse");
    }
    isActive = !isActive;
  };

  $: isCollapsed ? (isActive = false) : null;
</script>

<candy-accordion label="{label}" active="{isActive}" on:onChange="{handleAccordion}">
  <div slot="icon">
    <Fa icon="{icon}" />
  </div>
  <slot />
</candy-accordion>
