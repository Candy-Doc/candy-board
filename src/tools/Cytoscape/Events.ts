import type { Instance, Props } from 'tippy.js'

export interface NodesTippy {
  id: string
  tippy: Instance<Props>
}

let hideNeighborsValue = false
let isCtrlPressed = false
let nodePositionsChanged = false

const errorOverrideStyle = {
  'border-color': '#B71C1C',
  'border-width': 3,
  'font-weight': 'bold'
}

const warningOverrideStyle = {
  'border-color': '#ab771f',
  'border-width': 3,
  color: '#ab771f',
  'font-weight': 'bold'
}

export const setHideNeighborsValue = (value: boolean) => {
  hideNeighborsValue = value
}

export const setCytoscapeEvents = (cyInstance: any, tippys: Array<NodesTippy>) => {
  document.onkeydown = checkCtrlKeyPressed
  document.onkeyup = checkCtrlKeyPressed
  cyInstance.on('mouseover', 'node', (event: cytoscape.EventObjectNode) => {
    applyHoverStyle(event.target)
    showTippy(tippys, event.target)
    if (hideNeighborsValue) {
      hideNeighbors(cyInstance, event.target)
    }
  })

  cyInstance.on('mouseout', 'node', (event: cytoscape.EventObjectNode) => {
    resetNodeStyle(event.target)
    hideTippy(tippys, event.target)
    showNeighbors(cyInstance)
  })

  cyInstance.on('mouseover', 'edge', (event: cytoscape.EventObjectEdge) =>
    showTippy(tippys, event.target)
  )

  cyInstance.on('mouseout', 'edge', (event: cytoscape.EventObjectEdge) =>
    hideTippy(tippys, event.target)
  )

  cyInstance.on('click', 'node', (event: cytoscape.EventObjectNode) => {
    if (isCtrlPressed) {
      cyInstance.animate({
        center: {
          eles: event.target
        },
        easing: 'ease'
      })
    }
    resetNodeStyle(event.target)
  })

  cyInstance.on('mouseup', 'node', () => {
    if (nodePositionsChanged) {
      nodePositionsChanged = false
      localStorage.setItem('elementsPosition', JSON.stringify(cyInstance.json().elements))
    }
  })

  cyInstance.on('position', 'node', () => {
    nodePositionsChanged = true
  })
}

const applyHoverStyle = (node: cytoscape.NodeSingular) => {
  if (!node.selected()) {
    if (node.hasClass('error')) {
      node.style(errorOverrideStyle)
    } else if (node.hasClass('warning')) {
      node.style(warningOverrideStyle)
    } else {
      node.addClass('hover')
    }
  }
}

const resetNodeStyle = (node: cytoscape.NodeSingular) => {
  node.removeStyle()
  node.removeClass('hover')
  if (node.hasClass('event') || node.hasClass('command')) {
    node.style({
      width: node.layoutDimensions({ nodeDimensionsIncludeLabels: true }).w + 50
    })
  }
}

const hideNeighbors = (cyInstance: any, node: cytoscape.NodeSingular) => {
  const neighbors = node.neighborhood()

  cyInstance.elements().not(node).not(neighbors).addClass('hidden')

  if (node.isChild()) {
    node.parent().forEach((subChild: cytoscape.NodeSingular) => {
      subChild.removeClass('hidden')
    })
  }
  if (node.isParent()) {
    node.children().forEach((subChild: cytoscape.NodeSingular) => {
      subChild.removeClass('hidden')
    })
  }
}

const showNeighbors = (cyInstance: any) => {
  cyInstance.$().removeClass('hidden')
}

const showTippy = (
  tippys: Array<NodesTippy>,
  item: cytoscape.NodeSingular | cytoscape.EdgeSingular
) => {
  if (item.hasClass('error') || item.hasClass('warning')) {
    tippys.find(elem => elem.id === item.id())?.tippy.show()
  }
}

const hideTippy = (
  tippys: Array<NodesTippy>,
  item: cytoscape.NodeSingular | cytoscape.EdgeSingular
) => {
  if (item.hasClass('error') || item.hasClass('warning')) {
    tippys.find(elem => elem.id === item.id())?.tippy.hide()
  }
}

const checkCtrlKeyPressed = (e: KeyboardEvent) => {
  e.stopPropagation()
  isCtrlPressed = e.ctrlKey
}
