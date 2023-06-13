<script lang="ts">
  import Fa from "svelte-fa/src/fa.svelte";
  import { faEye, faLocation } from "@fortawesome/free-solid-svg-icons";
</script>

<candy-accordion label="shelf" active>
  <div slot="options">
    <Fa icon="{faLocation}" />
  </div>
  <div slot="options">
    <Fa icon="{faEye}" />
  </div>
  <candy-accordion label="book" active>
    <candy-sidebar-element label="Title"></candy-sidebar-element>
    <candy-sidebar-element label="Author"></candy-sidebar-element>
  </candy-accordion>
</candy-accordion>
