<script lang="ts">
  import { type SidebarItem, ElementType } from "./SidebarItemTypes";
  import DocTitle from "@Src/components/DocSidebar/DocTitle/DocTitle.svelte";
  import DocElement from "@Src/components/DocSidebar/DocElement/DocElement.svelte";

  export let summary: Array<SidebarItem> = [];

</script>

<div class="sidebar">
  <candy-sidebar-doc>
    {#each summary as item}
      {#if item.type === ElementType.TITLE}
        <DocTitle title="{item}" expand />
      {:else}
        <DocElement element="{item}" />
      {/if}
    {/each}
  </candy-sidebar-doc>
</div>
