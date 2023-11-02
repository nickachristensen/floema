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
    }

    createTexture () {
        const { index, medias } = this.collections

        this.media = medias[index]
    }

    createProgram () {
        this.program = new Program(this.gl, {
            fragment,
            vertex,
            uniforms: {
                uAplha: { value: 1 },
                tMap: { value: this.media.texture }
            }
        })
    }

    createMesh () {
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        })

        this.mesh.scale.x = this.media.mesh.scale.x
        this.mesh.scale.y = this.media.mesh.scale.y
        this.mesh.scale.z = this.media.mesh.scale.z

        this.mesh.position.z = this.media.mesh.position.z + 0.01

        this.mesh.setParent(this.scene)
    }


    /* Animations */
    transition () {
        
    }

}