<script lang="ts">
  import type { SidebarItem } from "../types";

  export let element: SidebarItem;

  const handleClickElement = () => {
    document.getElementById(element.id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  };
</script>

<candy-sidebar-doc-element
  label="{element.label}"
  active="{false}"
  on:click|stopPropagation="{handleClickElement}"></candy-sidebar-doc-element>
