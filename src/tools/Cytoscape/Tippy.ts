import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

export const makeTippy = function (ele: cytoscape.SingularElementReturnValue, text: string) {
  const ref = ele.popperRef()

  // Since tippy constructor requires DOM element/elements, create a placeholder
  const dummyDomEle = document.createElement('div')
  //Select warning or error theme
  const theme = ele.hasClass('error') ? 'error' : 'warning'

  const tip = tippy(dummyDomEle, {
    getReferenceClientRect: ref.getBoundingClientRect,
    trigger: 'manual', // mandatory
    // dom element inside the tippy:
    content: () => {
      // function can be better for performance
      const div = document.createElement('div')
      div.innerHTML = text
      return div
    },
    // your own preferences:
    arrow: true,
    placement: 'bottom',
    hideOnClick: false,
    // sticky: 'reference',

    theme: theme,
    interactive: false,
    appendTo: document.body // or append dummyDomEle to document.body
  })
  return tip
}
