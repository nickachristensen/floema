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
    anmateDetail () {
        GSAP.to(this.mesh.scale, {
            duration: 1.5,
            ease: 'expo.inOut',
            x: element.mesh.scale.x,
            y: element.mesh.scale.y,
            z: element.mesh.scale.z
        })

        GSAP.to(this.mesh.position, {
            duration: 1.5,
            ease: 'expo.inOut',
            x: element.mesh.position.x,
            y: element.mesh.position.y,
            z: element.mesh.position.z
        })
    }
}