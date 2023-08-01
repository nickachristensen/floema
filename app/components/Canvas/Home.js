import map from 'lodash/map'

import Media from './Media'

export default class {
    constructor () {
        this.medias = document.querySelectorAll('.home__gallery__media__image')

        this.createGallery()
    }

    createGallery () {
        map(this.medias, (element, index) => {
            return new Media ({
                element,
                index
            })
        })
    }
}