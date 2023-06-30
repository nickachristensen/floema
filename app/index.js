import About from 'pages/About'

class App {
  constructor() {
    console.log('App')
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home()
    }
  }
}

new App()
