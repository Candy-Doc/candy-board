<script lang="ts">
  import { onMount } from "svelte";
  import {
    faBookBookmark,
    faPalette,
    faBookmark as faSolidBookmark,
    faScrewdriverWrench,
  } from "@fortawesome/free-solid-svg-icons";
  import {
    faBookmark as faRegularBookmark,
  } from "@fortawesome/free-regular-svg-icons";

  import ElementContainer from "./ElementContainer.svelte";
  import PatternsList from "./Elements/Patterns/PatternsList.svelte";
  import Tools from "./Elements/Tools.svelte";
  import Legend from "./Elements/Legend.svelte";

  let collapsed = false;
  let sidebarContainer: HTMLElement | null;

  onMount(() => {
    sidebarContainer = document.getElementById("graph-sidebar");
  });

  const collapseSidebar = () => {
    collapsed = !collapsed;
    sidebarContainer?.classList.contains("sidebar")
      ? sidebarContainer?.classList.remove("sidebar")
      : sidebarContainer?.classList.add("sidebar");
  };
</script>

<div id="graph-sidebar" class="sidebar">
  <candy-sidebar on:onCollapse="{collapseSidebar}">
    <ElementContainer
      label="Patterns"
      icon="{faBookBookmark}"
      isCollapsed="{collapsed}"
      on:collapse="{collapseSidebar}"
    >
      <PatternsList on:centerNode on:hideNodeNeighbors />
    </ElementContainer>
    <ElementContainer
      label="Legend"
      icon="{faPalette}"
      iconOptions="{[{ active: faSolidBookmark, inactive: faRegularBookmark }]}"
      isCollapsed="{collapsed}"
      on:collapse="{collapseSidebar}"
    >
      <Legend />
    </ElementContainer>
    <ElementContainer
      label="Tools"
      icon="{faScrewdriverWrench}"
      iconOptions="{[{ active: faSolidBookmark, inactive: faRegularBookmark }]}"
      isCollapsed="{collapsed}"
      on:collapse="{collapseSidebar}"
    >
      <Tools on:fit on:reset on:downloadSVG on:viewSVG />
    </ElementContainer>
  </candy-sidebar>
</div>

<style>
  candy-sidebar::part(sidebar) {
    padding: 0;
  }
</style>
