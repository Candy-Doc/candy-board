<script lang="ts">
  import "@candy-doc/ui/src/components/SidebarDoc";
  import "@candy-doc/ui/src/components/SidebarDoc/DocTitle";
  import "@candy-doc/ui/src/components/SidebarDoc/DocElement";

  type sidebarItem = {
    type: string,
    label: string,
    active: boolean,
    childrens?: Array<sidebarItem>
  };

  const sidebarElements: Array<sidebarItem> = [
    { type: "title", label: "Getting started", active: false, childrens: [
      { type: "element", label: "Introduction", active: false },
      { type: "element", label: "Yes aie", active: false }]
    },
  ];

  const setActive = (titleElement: sidebarItem) => {
    const index = sidebarElements.findIndex((elem) => elem.label === titleElement.label);
    if (index !== -1) {
      sidebarElements[index].active = !sidebarElements[index].active;
    }
  };

  const navigateTo = (e?: Event) => {
    e?.stopPropagation();
  }
</script>

<candy-sidebar-doc>
  {#each sidebarElements as item}
    {#if item.type === "title"}
      <candy-sidebar-doc-title label={item.label} active={item.active} on:click={setActive(item)}>
        {#if item.childrens}
            {#each item.childrens as child}
              <candy-sidebar-doc-element label={child.label} active={child.active} on:click={navigateTo}></candy-sidebar-doc-element>
            {/each}
        {/if}
      </candy-sidebar-doc-title>
    {:else}
      <candy-sidebar-doc-element label={item.label} active={item.active}></candy-sidebar-doc-element>
    {/if}
  {/each}
</candy-sidebar-doc>
