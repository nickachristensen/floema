import GSAP from 'gsap'

import { Mesh, Plane,  Program } from 'ogl'

import fragment from 'shaders/plane-fragment.glsl'
import vertex from 'shaders/plane-vertex.glsl'

export default class {
    constructor ({ gl, scene, sizes, transition, id }) {
        this.element = document.querySelector('.detail__media__image')
        
        this.id = 'detail'
        this.gl = gl
        this.scene = scene
        this.sizes = sizes
        this.transition = transition

        this.geometry = new Plane()
        
        this.createTexture()
        this.createProgram()
        this.createMesh()
        this.createBounds({ sizes: this.sizes })

        this.show()
    }

    createTexture () {
        const image = this.element.getAttribute('data-src')

        this.texture = window.TEXTURES[image]
    }

    createProgram () {
        this.program = new Program(this.gl, {
            fragment,
            vertex,
            uniforms: {
                uAplha: { value: 0 },
                tMap: { value: this.texture }
            }
        })
    }

    createMesh () {
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        })

        this.mesh.setParent(this.scene)
    }

    createBounds ({ sizes }) {
        this.sizes = sizes
        this.bounds = this.element.getBoundingClientRect()

        this.updateScale(sizes)
        this.updateX()
        this.updateY()
    }

    /* Animations */
    show () {
        if (this.transition) {
            this.transition.animate(this.mesh, () => {
                this.program.uniforms.uAlpha.value = 1
            })
        } else {
            GSAP.to(this.program.uniforms.uAlpha, {
                duration: 1,
                value: 1
            })
        }
    }

    hide () {

    }

    /* Events */
    onResize (sizes) {
        this.createBounds(sizes)
        this.updateX()
        this.updateY()
    }

    onTouchDown() {

    }

    onTouchMove () {

    }

    onTouchUp () {
        
    }

    /* Loop */
    updateScale () {
        this.height = this.bounds.height / window.innerHeight
        this.width = this.bounds.width / window.innerWidth

        this.mesh.scale.x = this.sizes.width * this.width
        this.mesh.scale.y = this.sizes.height * this.height
    }

    updateX () {
        this.x = (this.bounds.left)/ window.innerWidth

        this.mesh.position.x = (-this.sizes.width / 2) + (this.mesh.scale.x / 2) + (this.x * this.sizes.width)
    }

    updateY () {
        this.y = (this.bounds.top) / window.innerHeight

        this.mesh.position.y = (this.sizes.height / 2) - (this.mesh.scale.y / 2) - (this.y * this.sizes.height)
    }

    update () {  
        this.updateX(scroll)
        this.updateY()
    }

    show () {
      const timeline = GSAP.timeline({
        delay: 2
      })

        this.animationIn.fromTo(this.element, {
            autoAlpha: 0,
          },{
            autoAlpha: 1,
          })

          super.show(timeline)
    }

    /* Destroy */
    destroy () {
        this.scene.removeChild(this.mesh)
    }
}