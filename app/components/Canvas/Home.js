import { Plane, Transform } from 'ogl'

import map from 'lodash/map'

import Media from './Media'

export default class {
    constructor ({ gl, scene, sizes }) {
        this.gl = gl
        this.sizes = sizes

        this.group = new Transform()

        this.mediasElements = document.querySelectorAll('.home__gallery__media__image')

        this.createGeometry()
        this.createGallery()

        this.group.setParent(scene)
    }

    createGeometry() {
        this.geometry = new Plane(this.gl)
    }

    createGallery () {
        this.medias = map(this.mediasElements, (element, index) => {
            return new Media ({
                element,
                geometry: this.geometry,
                index,
                gl: this.gl,
                scene: this.group,
                sizes: this.sizes
            })
        })
    }

    /* Events */
    onResize (event) {
        map(this.medias, media => media.onResize(event))
    }

    onTouchDown ({ x, y }) {

    }

    onTouchMove ({ x, y }) {
        
    }

    onTouchUp ({ x, y }) {
        
    }

    /* Update */
    update () {
        map(this.medias, media => {
            media.update()
        })
    }
}