import GSAP from 'gsap'

import Animation from 'classes/Animation'

import { calculate, split } from 'utils/text'

export default class Title extends Animation {
  constructor ({ element, elements }) {
    console.log(element)

    super({
        element,
        elements
    })

    split({ element: this.element, append: true })
    split({ element: this.element, append: true })
  
    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn () {
    GSAP.set(this.element, {
        autoAlpha: 1
    })

    GSAP.fromTo(this.elementsLines, {
        y: '100%'
    }, {
        delay: 0.5,
        duration: 1.5,
        stagger: {
            amount: 1,
            axis: 'x'
        },
        y: '0%'
    })
  }

  animateOut () {
    GSAP.set(this.element, {
        autoAlpha: 0
    })
  }

  onResize () {
    this.elementsLines = calculate(this.elementLinesSpans)

    console.log(this.elementsLines)
  }
}