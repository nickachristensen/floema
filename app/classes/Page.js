import GSAP from 'gsap'
import each from 'lodash/each'

export default class Page {
  constructor({
    element,
    elements,
    id
  }) {
    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.id = id
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
  }

  show() {
    return new Promise(resolve => {
      this.animationIn = GSAP.timeline()

      this.animationIn.fromTo(this.element, {
        autoAlpha: 0,
      },{
        autoAlpha: 1,
      })

      this.animationIn.call (()=> {
        this.addEventListeners()

        resolve()
      })
    })
  }

  hide() {
    return new Promise(resolve => {
      this.removeEventListeners()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  onMouseWheel (event) {
    console.log(event)

    const { deltaY } = event

    console.log(deltaY)
  } 

  addEventListeners () {
    window.addEventListener('mousewheel', this.onMouseWheel)
  }

  removeEventListeners () {
    window.removeEventListener('mousewheel', this.onMouseWheel)
  }
}
