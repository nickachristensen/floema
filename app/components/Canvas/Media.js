import { Mesh, Program, Texture } from 'ogl'

import fragment from 'shaders/plane-fragment.glsl'
import vertex from 'shaders/plane-vertex.glsl'

export default class {
    constructor ({ element, geometry, gl, scene }) {
        this.element = element
        this.geometry = geometry
        this.gl = gl
        this.scene = scene
    }

    createTexture () {
        this.texture = new Texture(this.gl)
    }

    createProgram () {
        this.program = new Program({
            fragment,
            vertex,
            uniforms: {

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
}