import map from 'lodash/map'

import Media from './Media'

export default class Gallery {
    constructor ({ element, geometry, index, gl, scene, sizes }) {
        this.element = element
        this.geometry = geometry
        this.index = index
        this.gl = gl
        this.scene = scene
        this.sizes = sizes
        
        this.createMedias()
    }

    createMedias () {
        this.mediasElements = this.element.querySelectorAll('.about__gallery__media')

        this.media = map(this.mediasElements, (element, index) => {
            return new Media({
                element,
                geometry: this.geometry,
                index,
                gl: this.gl,
                scene: this.group,
                sizes: this.sizes
            })
        })
    }
}