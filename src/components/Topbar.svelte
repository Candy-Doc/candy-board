<script lang="ts">
  import { useNavigate } from "svelte-navigator";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faBug } from "@fortawesome/free-solid-svg-icons";
  import "@candy-doc/ui/src/components/Topbar";
  import "@candy-doc/ui/src/components/Topbar/Element";

  const navigate = useNavigate();

  const changeUrl = (path: string) => {
    navigate(path);
  };
</script>

<candy-topbar>
  <candy-topbar-element on:click="{() => changeUrl('/')}" label="Getting Started"
  ></candy-topbar-element>
  <candy-topbar-element on:click="{() => changeUrl('/demo-cytoscape')}" label="Graph"
  ></candy-topbar-element>
  <candy-topbar-element on:click="{() => changeUrl('/contact')}" label="Contact"
  ></candy-topbar-element>
  <candy-topbar-element>
    <a
      slot="icon"
      href="https://github.com/Candy-Doc/candy-board/issues/new/choose"
      target="_blank"
    >
      <Fa icon="{faBug}" />
    </a></candy-topbar-element
  >
</candy-topbar>

<style>
  candy-topbar::part(topbar) {
    padding: 0.5rem 2rem;
  }
</style>
