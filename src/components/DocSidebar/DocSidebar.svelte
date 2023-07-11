<script lang="ts">
  import { type SidebarItem, ElementType } from "./types";
  import DocTitle from "@Src/components/DocSidebar/DocTitle/DocTitle.svelte";
  import DocElement from "@Src/components/DocSidebar/DocElement/DocElement.svelte";

  const sidebarElements: Array<SidebarItem> = [
    {
      type: ElementType.TITLE,
      label: "Getting started",
      childrens: [
        { type: ElementType.ELEMENT, label: "Introduction" },
        { type: ElementType.ELEMENT, label: "DDD" },
      ],
    },
  ];
</script>

<div class="sidebar">
  <candy-sidebar-doc>
    {#each sidebarElements as item}
      {#if item.type === ElementType.TITLE}
        <DocTitle title="{item}" expand />
      {:else}
        <DocElement element="{item}" />
      {/if}
    {/each}
  </candy-sidebar-doc>
</div>
