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
  {#if title.childrens}
    {#each title.childrens as child}
      {#if child.type === ElementType.TITLE}
        <svelte:self title="{child}" expand="{true}" />
      {:else}
        <DocElement element="{child}" />
      {/if}
    {/each}
  {/if}
</candy-sidebar-doc-title>
