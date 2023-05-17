import type { Stylesheet, NodeSingular } from 'cytoscape'

const Style: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'background-color': 'white',
      label: 'data(label)',
      shape: 'ellipse',
      'text-valign': 'center',
      'text-halign': 'center',
      'text-wrap': 'ellipsis',
      width: (node: NodeSingular) => {
        const width = node.data('label').length * 8
        return width > 30 ? width : 30
      }
    }
  },
  {
    selector: ':parent',
    style: {
      'text-valign': 'top',
      'text-halign': 'center',
      shape: 'round-rectangle'
    }
  },
  {
    selector: '.boundedContext',
    style: {
      'background-color': 'white',
      'text-transform': 'uppercase',
      shape: 'barrel',
      'padding-bottom': '40',
      'padding-top': '40',
      'padding-right': '40',
      'padding-left': '40',
      'font-size': '20',
      'font-weight': 'bold',
      'border-color': 'black',
      'border-style': 'dashed',
      'border-width': 1
    }
  },
  {
    selector: '.aggregate',
    style: {
      'background-color': '#D1ECE7',
      color: '#1C8290',
      'border-color': '#1C8290',
      'border-width': 2,
      shape: 'round-rectangle',
      height: 30,
      'padding-bottom': '10',
      'padding-top': '10',
      'padding-right': '10',
      'padding-left': '10'
    }
  },
  {
    selector: '.entity',
    style: {
      'padding-bottom': '10',
      'padding-top': '10',
      'padding-right': '10',
      'padding-left': '10',
      'background-color': '#FCF3CF',
      color: '#7B755E',
      'border-color': '#7B755E',
      'border-width': 1,
      shape: 'round-rectangle',
      height: 30
    }
  },
  {
    selector: '.valueObject',
    style: {
      'background-color': '#D9F7A5',
      'border-color': '#7B9846',
      color: '#7B9846',
      'border-width': 1,
      'padding-bottom': '10',
      'padding-top': '10',
      'padding-right': '10',
      'padding-left': '10',
      height: 30
    }
  },
  {
    selector: '.command',
    style: {
      color: '#1697BF',
      'background-color': '#ADEBFF',
      'border-color': '#1697BF',
      'border-width': 1,
      height: 50,
      shape: 'polygon',
      'shape-polygon-points': '-0.7, -1, 1, -1, 0.7, 1, -1, 1'
    }
  },
  {
    selector: '.event',
    style: {
      color: '#B4830A',
      'background-color': '#F9DD9A',
      'border-color': '#B4830A',
      'border-width': 1,
      height: 50,
      shape: 'polygon',
      'shape-polygon-points': '-0.8, 0, -1, -1, 0.8, -1, 1, 0,  0.8, 1, -1, 1'
    }
  },
  {
    selector: '.factory',
    style: {
      color: '#9D6C4B',
      'background-color': '#F6DDCC',
      'border-color': '#E2BA9F',
      'border-width': 2,
      'padding-bottom': '10',
      'padding-top': '10',
      'padding-right': '10',
      'padding-left': '10',
      height: 50,
      shape: 'polygon',
      'shape-polygon-points':
        '-1, 1, -1, -0.4, -0.3, -1, -0.3, -0.4, 0.3, -1, 0.3, -0.4, 1, -1, 1, 1'
    }
  },
  {
    selector: '.factory[label]',
    style: {
      label: 'data(label)',
      'text-margin-y': 8,
      'font-weight': 'bold'
    }
  },
  {
    selector: '.repository',
    style: {
      'background-color': '#AED6F1',
      'border-color': '#649EC6',
      color: '#4F6878',
      'font-weight': 'bold',
      'border-width': 2,
      shape: 'hexagon',
      'padding-bottom': '10',
      'padding-top': '10',
      'padding-right': '10',
      'padding-left': '10',
      height: 50
    }
  },
  {
    selector: '.sharedKernel',
    style: {
      'background-color': 'white',
      'text-transform': 'uppercase',
      shape: 'barrel',
      'padding-bottom': '40',
      'padding-top': '40',
      'padding-right': '40',
      'padding-left': '40',
      'font-size': '20',
      'font-weight': 'bold',
      'border-style': 'dashed',
      'border-width': '5'
    }
  },
  {
    selector: '.service',
    style: {
      'background-color': '#A3E4D7',
      'border-color': '#5EAF9F',
      color: '#3F5C57',
      'font-weight': 'bold',
      'border-width': 2,
      shape: 'bottom-round-rectangle',
      'padding-bottom': '10',
      'padding-top': '10',
      'padding-right': '10',
      'padding-left': '10',
      height: 50
    }
  },
  {
    selector: 'edge',
    style: {
      width: 5,
      'line-color': '#000',
      'target-arrow-color': '#000',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-color': 'blue',
      'border-width': 3
    }
  },
  {
    selector: '.warning',
    style: {
      'line-color': '#ffb32c',
      'target-arrow-color': '#ffb32c',
      'line-style': 'dashed',
      'background-color': '#ffb32c',
      'border-color': '#d59727',
      color: (node: NodeSingular) => {
        if (node.parent().toArray().some((ele: NodeSingular) => ele.hasClass("error")) || !node.isParent()) {
          return '#fff8ea'
        } else {
          return '#ffb32c'
        }
      }
    }
  },
  {
    selector: '.error',
    style: {
      'line-color': '#ff4248',
      'target-arrow-color': '#ff4248',
      'line-style': 'dashed',
      'background-color': '#ff4248',
      'border-color': '#B71C1C',
      color: (node: NodeSingular) => {
        if (node.parent().toArray().some((ele: NodeSingular) => ele.hasClass("error")) || !node.isParent()) {
          return '#FFEBEE'
        } else {
          return '#EF5350'
        }
      }
    }
  },
  {
    selector: '.hover',
    style: {
      'border-color': 'black',
      'border-width': 2,
      color: 'rgb(0, 0, 0)'
    }
  },
  {
    selector: '.hidden',
    style: {
      'background-opacity': 0.05,
      'border-opacity': 0.05,
      'text-opacity': 0.05,
      'line-opacity': 0.05
    }
  }
]

export default Style
