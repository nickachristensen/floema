import Component from 'classes/Component'
import { _forEachName } from 'gsap/gsap-core'
import each from 'lodash/each'

export default class Preloader extends Component {
  constructor () {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        images: document.querySelectorAll('img')
      }
    })

    console.log(this.element, this.elements)

    this.createLoader()
  }

  createLoader () {
    each(this.elements.images, image => {
      console.log(image)
    })
  }
}
