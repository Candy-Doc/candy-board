<script lang="ts">
  import { navigate, useLocation } from "svelte-navigator";
  import CandyData from "@Public/candy-data.json";
  import "@candy-doc/ui/src/components/Sidebar/Element/Element";
  import "@candy-doc/ui/src/components/Sidebar/SideBar";
  import slugify from "slugify";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faBinoculars, faObjectGroup } from "@fortawesome/free-solid-svg-icons";

  const location = useLocation();

  const sidebarElements = [{ label: "Overview", path: "/", active: false, icon: faBinoculars }];

  CandyData.forEach(({ name }) =>
    sidebarElements.push({
      label: name,
      path: slugify(name, { lower: true, strict: true, trim: true }),
      active: false,
      icon: faObjectGroup,
    })
  );

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
