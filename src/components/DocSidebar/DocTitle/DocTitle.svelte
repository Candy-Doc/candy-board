<script lang="ts">
  import { type SidebarItem, ElementType } from "../types";
  import DocElement from "../DocElement/DocElement.svelte";

  export let expand = true;
  export let title: SidebarItem;

  const hideChildren = () => {
    expand = !expand;
  };
</script>

<candy-sidebar-doc-title
  label="{title.label}"
  active="{expand}"
  on:click|stopPropagation="{hideChildren}"
>
  {#if title.summary}
    {#each title.summary as subpart}
      {#if subpart.type === ElementType.TITLE}
        <svelte:self title="{subpart}" expand="{true}" />
      {:else}
        <DocElement element="{subpart}" />
      {/if}
    {/each}
  {/if}
</candy-sidebar-doc-title>
