import GSAP from 'gsap'
import { Mesh, Plane, Program } from 'ogl'

import fragment from 'shaders/home-fragment.glsl'
import vertex from 'shaders/home-vertex.glsl'

export default class {
    constructor ({ collections, gl, scene, sizes, url }) {
        this.collections = collections
        this.gl = gl
        this.scene = scene
        this.sizes = sizes
        this.url = url

        this.geometry = new Plane(this.gl)
        
        this.createTexture()
        this.createProgram()
        this.createMesh()

        this.extra = {
            x:0,
            y:0
        }
    }

    createTexture () {
        const image = this.element.querySelector('collections__gallery__media__image')

        this.texture = window.TEXTURES[image.getAttribute('data-src')]
    }

    createProgram () {
        this.program = new Program(this.gl, {
            fragment,
            vertex,
            uniforms: {
                uAplha: { value: 1 },
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


    /* Animations */
    transition () {

    }

}