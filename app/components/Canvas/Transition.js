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
    }

    createTexture () {
        const { index, medias } = this.collections

        this.media = medias[index]
    }

    createProgram (texture) {
        this.program = new Program(this.gl, {
            fragment,
            vertex,
            uniforms: {
                uAplha: { value: 1 },
                tMap: { value: texture }
            }
        })
    }

    createMesh (mesh) {
        this.mesh = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        })

        this.mesh.scale.x = mesh.scale.x
        this.mesh.scale.y = mesh.scale.y
        this.mesh.scale.z = mesh.scale.z

        this.mesh.position.x = mesh.position.x
        this.mesh.position.y = mesh.position.y
        this.mesh.position.z = mesh.position.z + 0.01

        this.mesh.setParent(this.scene)
    }

    /* Element */
    setElement (element) {
        if (element.id === 'collections') {
            const { index, medias } = this.collections
            const media = medias[index]

            this.createProgram(media.texture)
            this.createMesh(media.mesh)

            this.transition = 'detail'
        } else {
            this.createProgram(element.texture)
            this.createMesh(element.mesh)

            this.transition = 'collections'
        }
    }

    /* Animations */
    animate (element, onComplete) {
        const timeline = GSAP.timeline({
            delay: 0.5,
            onComplete
        })

        timeline.to(this.mesh.scale, {
            duration: 1.5,
            ease: 'expo.inOut',      
            x: element.scale.x,
            y: element.scale.y,
            z: element.scale.z
        }, 0)

        timeline.to(this.mesh.position, {
            duration: 1.5,
            ease: 'expo.inOut',
            x: element.position.x,
            y: element.position.y,
            z: element.position.z
        }, 0)

        timeline.call(() => {
            this.scene.removeChild(this.mesh)
        })
    }
}