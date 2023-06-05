<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const fitGraphView = () => dispatch("fit");

  const resetGraph = () => dispatch("reset");

  const downloadSVG = () => dispatch("downloadSVG");

  const viewSVG = () => dispatch("viewSVG");

</script>

<div class="flex flex-col gap-2 py-2">
  <candy-button label="Fit view" on:click|stopPropagation={fitGraphView}></candy-button>
  <candy-button label="Reset" on:click|stopPropagation={resetGraph}></candy-button>
  <candy-button label="Download SVG" on:click|stopPropagation="{downloadSVG}"></candy-button>
  <candy-button label="View SVG" on:click|stopPropagation="{viewSVG}"></candy-button>
</div>

<style>
  candy-button::part(button) {
    width: 90%;
  }
</style>