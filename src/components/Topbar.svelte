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
  <button on:click="{() => changeUrl('/')}">
    <candy-topbar-element label="Getting Started"></candy-topbar-element>
  </button>
  <button on:click="{() => changeUrl('/demo-cytoscape')}">
    <candy-topbar-element label="Graph"></candy-topbar-element>
  </button>
  <button on:click="{() => changeUrl('/contact')}">
    <candy-topbar-element label="Contact"></candy-topbar-element>
  </button>
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
    padding: 0.5rem 0.75rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    background-color: rgb(248, 249, 250, 1);
    height: var(--header-height);
  }
</style>
