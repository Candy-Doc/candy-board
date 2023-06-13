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
  import "@Src/styles/cytoscape.css";
  import GraphSidebar from "@Src/components/GraphSidebar/GraphSidebar.svelte";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cyInstance: any;
  let disableHiding = false;
  let chartCanvas: HTMLElement;
  let tippys: Array<NodesTippy> = [];
  let fcoseLayoutOptions = {
    name: "fcose",
    nodeSep: 100,
    uniformNodeDimensions: true,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: true,
    padding: 10,
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
    localStorage.removeItem("elementsPosition");
    const savedElements = localStorage.getItem("elementsPosition");

    cyInstance = Cytoscape({
      container: chartCanvas,
      elements: savedElements ? JSON.parse(savedElements) : webCommerceContextsJson,
      style: Style,
      layout: savedElements ? presetLayoutOptions : fcoseLayoutOptions,
    });

    if (!savedElements) {
      localStorage.setItem("elementsPosition", JSON.stringify(cyInstance.json().elements));
    }

    cyInstance.elements().forEach((elem: Cytoscape.SingularElementReturnValue) => {
      addClassAndDisplayTooltips(elem);
    });

    cyInstance.nodes().forEach((node: Cytoscape.NodeSingular) => {
      if (node.hasClass("event") || node.hasClass("command")) {
        // Set custom shapes width based on label size
        node.style({
          width: node.layoutDimensions({ nodeDimensionsIncludeLabels: true }).w + 50,
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
  });

  onDestroy(() => {
    cyInstance.off("mouseover");
    cyInstance.off("mouseout");
    cyInstance.off("click");
  });

  const downloadSVG = () => {
    if (cyInstance) {
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
    }
  };

  const viewSVG = () => {
    if (cyInstance) {
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
    }
  };

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
  };

  const resetCameraView = (e?: Event | undefined) => {
    e?.stopPropagation();
    cyInstance.animate({
      fit: {
        eles: cyInstance.elements(),
        padding: 10,
      },
      easing: "ease",
    });
  };

  const resetGraph = () => {
    cyInstance.layout(fcoseLayoutOptions).run();
    localStorage.setItem("elementsPosition", JSON.stringify(cyInstance.json().elements));
  };

  $: setHideNeighborsValue(disableHiding);
</script>

<div class="flex h-full">
  <GraphSidebar
    on:fit="{resetCameraView}"
    on:reset="{resetGraph}"
    on:downloadSVG="{downloadSVG}"
    on:viewSVG="{viewSVG}"
  />
  <div class="graph-area bg-white rounded-xl shadow-lg">
    <div bind:this="{chartCanvas}" id="graph-canvas"></div>
  </div>
</div>

<style>
  .graph-area {
    justify-content: center;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  #graph-canvas {
    place-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
