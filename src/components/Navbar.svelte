<script lang="ts">
  import { navigate, useLocation } from "svelte-navigator";
  import "@candy-doc/ui/src/components/Sidebar/Element/Element";
  import "@candy-doc/ui/src/components/Sidebar/SideBar";
  import slugify from "slugify";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faBinoculars, faObjectGroup, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
  import { Context } from "@Src/tools/context";
  import { getContext } from "svelte";
  import type { WritableCandyData } from "@Src/types/candyData";

  const location = useLocation();
  const CandyData = getContext<WritableCandyData>(Context.CandyData);

  let sidebarElements = [{ label: "Overview", path: "/", active: false, icon: faBinoculars },
    { label: "Demo", path: "/demo-cytoscape", active: false, icon: faLaptopCode }];

  $: {
    sidebarElements = [...sidebarElements];
    $CandyData.forEach(({ simpleName }) =>
      sidebarElements.push({
        label: simpleName,
        path: slugify(simpleName, { lower: true, strict: true, trim: true }),
        active: false,
        icon: faObjectGroup,
      })
    );
  }

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
