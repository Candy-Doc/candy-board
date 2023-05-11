<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Cytoscape from "cytoscape";
  import svg from "cytoscape-svg";
  import fcose from "cytoscape-fcose";
  import expandCollapse from "cytoscape-expand-collapse";
  import popper from "cytoscape-popper";

  import { makeTippy } from "@Src/tools/Cytoscape/Tippy";
  import webCommerceContextsJson from "@Src/tools/Cytoscape/cytoscapeJson/web-commerce-contexts.json";
  import Style from "@Src/tools/Cytoscape/Style";
  import type { NodesTippy } from "@Src/tools/Cytoscape/Events";
  import { setCytoscapeEvents, setHideNeighborsValue } from "@Src/tools/Cytoscape/Events";
  import "@candy-doc/ui/src/components/Button/Button";

  let disableHiding = false;
  let cyInstance: any;
  let chartCanvas: HTMLElement;
  let printSvgButton: HTMLElement;
  let downloadSvgButton: HTMLElement;
  let tippys: Array<NodesTippy> = [];
  let fcoseLayoutOptions = {
    name: "fcose",
    nodeSep: 100,
    uniformNodeDimensions: true,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: true,
    padding: 5,
    quality: "proof",
    animate: false,
    randomize: true,
    nodeSeparation: 400,
  };
  let presetLayoutOptions = {
    name: "preset",
  };

  onMount(() => {
    Cytoscape.use(fcose);
    Cytoscape.use(popper);
    Cytoscape.use(svg);
    expandCollapse(Cytoscape);
    const savedElements = localStorage.getItem("elementsPosition");

    cyInstance = Cytoscape({
      container: chartCanvas,
      elements: savedElements ? JSON.parse(savedElements) : webCommerceContextsJson,
      style: Style,
      layout: savedElements ? presetLayoutOptions : fcoseLayoutOptions,
    });

    if (!savedElements) {
      localStorage.setItem(
        "elementsPosition",
        JSON.stringify(cyInstance.json().elements)
      );
    }

     cyInstance.elements().forEach((elem: Cytoscape.SingularElementReturnValue) => {
      addClassAndDisplayTooltips(elem);
    });

    cyInstance.nodes().forEach((node: Cytoscape.NodeSingular) => {
      if (node.hasClass("event") || node.hasClass("command")) {
        // Set custom shapes width based on label size
        node.style({
          width:
            node.layoutDimensions({ nodeDimensionsIncludeLabels: true }).w + 50,
        });
      }
    });

    // Cy events
    setCytoscapeEvents(cyInstance, tippys);

    const expandCollapseAPI = cyInstance.expandCollapse({
      layoutBy: {
        ...fcoseLayoutOptions,
        randomize: true,
      },
      animate: false,
      undoable: false,
      cueEnabled: true,
    });

    cyInstance.on("dblclick", "node", (evt: Event) => {
      const clickedNode = evt.target;
      if (expandCollapseAPI.isExpandable(clickedNode)) {
        expandCollapseAPI.expand(clickedNode);
      } else if (expandCollapseAPI.isCollapsible(clickedNode)) {
        expandCollapseAPI.collapse(clickedNode);
      }
    });

     printSvgButton.addEventListener("click", () => {
      const newWindow = window.open("", "newWindow");
      if (!newWindow) return;
      const newDocument = newWindow.document;
      const svg = cyInstance.svg({
        full: true,
        scale: 1,
      });
      const div = newDocument.createElement("div");
      div.innerHTML = svg;
      newDocument.body.appendChild(div);
    });

    downloadSvgButton.addEventListener("click", () => {
      const a = document.createElement("a");
      const svg = cyInstance.svg({
        full: true,
        scale: 1,
      });
      var blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "demo.svg";
      a.click();
    });
  });

  onDestroy(() => {
    cyInstance.off("mouseover");
    cyInstance.off("mouseout");
    cyInstance.off("click");
  });

  const addClassAndDisplayTooltips = (elem: Cytoscape.SingularElementReturnValue) => {
    let tooltipMessage = "";
    if (elem.data("errors")) {
      elem.addClass("error");
      elem.data("errors").forEach((errorMessage: string) => {
        tooltipMessage += errorMessage + "\n";
      });
      if (elem.data("warnings")) {
        elem.addClass("warning");
        elem.data("warnings").forEach((warningMessage: string) => {
          tooltipMessage += "Warning: " + warningMessage + "\n";
        });
      }
    } else if (elem.data("warnings")) {
      elem.addClass("warning");
      elem.data("warnings").forEach((warningMessage: string) => {
        tooltipMessage += warningMessage + "\n";
      });
    }

    if (tooltipMessage.length > 0) {
      tippys.push({ id: elem.id(), tippy: makeTippy(elem, tooltipMessage) });
    }
  }

  const resetCameraView = (e: Event | undefined) => {
    e?.stopPropagation();
    cyInstance.animate({
      fit: {
        eles: cyInstance.elements(),
        padding: 5,
      },
      easing: "ease",
    });
  };

  const resetGraph = () => {
    cyInstance.layout(fcoseLayoutOptions).run();
    localStorage.setItem(
      "elementsPosition",
      JSON.stringify(cyInstance.json().elements)
    );
  };

  $: setHideNeighborsValue(disableHiding);
</script>

<div class="relative">
  <div class="graph-area">
    <div class="options p-3 flex flex-col rounded-md">
      <candy-button
        label="Reset camera position"
        size="sm"
        class="pb-3"
        on:keypress={resetCameraView}
        on:click={resetCameraView}
      />
      <candy-button
        label="Reset graph"
        size="sm"
        class="pb-3"
        on:keypress={resetGraph}
        on:click={resetGraph}
      />
      <div class="flex items-center">
        <input
          type="checkbox"
          bind:checked={disableHiding}
          class="my-2 mr-2 rounded "
          name="hide-neighbors"
        />
        <label for="hide-neighbors">Enable hiding neighbors</label>
      </div>
    </div>
    <div bind:this={chartCanvas} id="graph-canvas" />
  </div>
  <div id="exportButtons">
    <candy-button
      type="Secondary"
      class="py-6"
      label="reset localStorage elements"
      size="md"
      on:keypress
      on:click={() => localStorage.removeItem("elementsPosition")}
    />
    <candy-button
      type="Secondary"
      class="py-6 px-4"
      label="Print as an SVG"
      size="md"
      bind:this={printSvgButton}
    />
    <candy-button
      type="Secondary"
      class="py-6"
      label="Download SVG"
      size="md"
      bind:this={downloadSvgButton}
    />
  </div>
</div>

<style>
  .graph-area {
    display: flex;
    justify-content: center;
    border-radius: 10px;
    width: 100%;
  }

  #graph-canvas {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    place-items: center;
    width: 100%;
    height: 80vh;
    display: block;
  }

  .options {
    z-index: 1000;
    position: absolute;
    top: 0;
    color: rgb(37 99 235);
    left: 0;
    background-color: rgba(191, 219, 254, 0.5);
    backdrop-filter: blur(10px);
  }

  #exportButtons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
