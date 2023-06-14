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
  <candy-topbar-element on:click="{() => changeUrl('/')}" label="Getting Started" on:keypress
  ></candy-topbar-element>
  <candy-topbar-element on:click="{() => changeUrl('/demo-cytoscape')}" label="Graph" on:keypress
  ></candy-topbar-element>
  <candy-topbar-element on:click="{() => changeUrl('/contact')}" label="Contact" on:keypress
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
    padding: 0.5rem 0.75rem;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    background-color: rgb(248, 249, 250, 1);
  }
</style>
