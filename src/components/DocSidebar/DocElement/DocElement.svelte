<script lang="ts">
  import "@candy-doc/ui/src/components/SidebarDoc/DocElement";

  import type { SidebarItem } from "../SidebarItemTypes";

  export let element: SidebarItem;

  const handleClickElement = () => {
    console.log("");
  }
</script>

<candy-sidebar-doc-element label={element.label} active={false} on:click|stopPropagation="{handleClickElement}"></candy-sidebar-doc-element>