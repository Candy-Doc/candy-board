<script lang="ts">
  import { onMount } from "svelte";
  import { faBookBookmark, faPalette, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

  import ElementContainer from "./ElementContainer.svelte";
  import Tools from "./Elements/Tools.svelte";
  import Patterns from "./Elements/Patterns.svelte";
  import Legend from "./Elements/Legend.svelte";

  let collapsed = false;
  let sidebarContainer: HTMLElement | null;

  onMount(() => {
    sidebarContainer = document.getElementById("graph-sidebar");
  });

  const collapseSidebar = () => {
    collapsed = !collapsed;
    sidebarContainer?.classList.contains("sidebar") ?
      sidebarContainer?.classList.remove("sidebar") : sidebarContainer?.classList.add("sidebar")
  }
</script>

<div id="graph-sidebar" class="sidebar">
  <candy-sidebar collapsed={collapsed} on:click={collapseSidebar}>
    <ElementContainer label="Patterns" icon={faBookBookmark} isCollapsed={collapsed} on:collapse={collapseSidebar}>
      <Patterns />
    </ElementContainer>
    <ElementContainer label="Legend" icon={faPalette} isCollapsed={collapsed} on:collapse={collapseSidebar}>
      <Legend />
    </ElementContainer>
    <ElementContainer label="Tools" icon={faScrewdriverWrench} isCollapsed={collapsed} on:collapse={collapseSidebar}>
      <Tools on:fit on:reset on:downloadSVG on:viewSVG/>
    </ElementContainer>
  </candy-sidebar>
</div>
