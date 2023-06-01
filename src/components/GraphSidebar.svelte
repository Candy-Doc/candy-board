<script lang="ts">
  import { navigate, useLocation } from "svelte-navigator";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faBinoculars, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
  import "@candy-doc/ui/src/components/Sidebar/Element";
  import "@candy-doc/ui/src/components/Sidebar";

  const location = useLocation();

  let sidebarElements = [
    { label: "Overview", path: "/", active: false, icon: faBinoculars },
    { label: "Demo", path: "/demo-cytoscape", active: false, icon: faLaptopCode },
  ];

  $: {
    let pathIndex = sidebarElements.findIndex((elem) => {
      if (elem.path === $location.pathname) {
        return true;
      } else if ("/" + elem.path === $location.pathname) {
        return true;
      }
      return false;
    });
    pathIndex = pathIndex === -1 ? 0 : pathIndex;
    sidebarElements.forEach((element) => (element.active = false));
    sidebarElements[pathIndex].active = true;
  }

  function handleNavigate(path: string) {
    navigate(path);
  }
</script>

<candy-sidebar>
  {#each sidebarElements as sidebarElement}
    <candy-sidebar-element
      on:click="{() => handleNavigate(sidebarElement.path)}"
      label="{sidebarElement.label}"
      active="{sidebarElement.active}"
    >
      <div slot="icon">
        <Fa icon="{sidebarElement.icon}" />
      </div>
    </candy-sidebar-element>
  {/each}
</candy-sidebar>
