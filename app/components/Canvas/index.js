import { Camera, Renderer, Transform } from 'ogl'

export default class Canvas {
    constructor () {
        this.createRenderer()
    }

    createRenderer () {
        this.renderer = new Renderer()

        this.gl = this.renderer.gl

        document.body.appendChild(this.gl.canvas)
    }

    createCamera () {
        this.camera = new Camera(this.gl)
        this.camera.position.z = 5
    }

    onResize () {
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.camera.perspective({
            aspect: window.innerWidth / window.innerHeight
        })
    }
}