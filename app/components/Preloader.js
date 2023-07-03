import Component from 'classes/Component'

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number'
      }
    })

    console.log(this.element, this.elements)
  }
}
