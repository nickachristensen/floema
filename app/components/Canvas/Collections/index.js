import { Plane, Transform } from 'ogl'
import GSAP from 'gsap'

import map from 'lodash/map'

import Media from './Media'

export default class {
    constructor ({ gl, scene, sizes }) {
        this.gl = gl
        this.scene = scene
        this.sizes = sizes

        this.group = new Transform()

        this.galleryElement = document.querySelector('.collections__gallery__wrapper')
        this.mediasElements = document.querySelectorAll('.collections__gallery__media')

        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            lerp: 0.1,
            velocity: 1
        }

        this.createGeometry()
        this.createGallery()

        this.group.setParent(this.scene)

        this.show()
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

    /* Animations */
    show () {
        map(this.medias, media => media.show())
    }

    hide () {
        map(this.medias, media => media.hide())
    }    

    /* Events */
    onResize (event) {
        
        this.bounds = this.galleryElement.getBoundingClientRect()
        
        this.sizes = event.sizes
        
        this.width = this.bounds.width / window.innerWidth * this.sizes.width
        
        this.scroll.last = this.scroll.target = 0

        map(this.medias, media => media.onResize(event, this.scroll))

        this.scroll.limit = this.bounds.width - this.media[0].element.clientWidth
    } 

    onTouchDown ({ x, y }) {
        this.scroll.last = this.scroll.current
    }

    onTouchMove ({ x, y }) {
        const distance = x.start - x.end

        this.x.target = this.scroll.last - distance
    }

    onTouchUp ({ x, y }) {
        
    }

    onWheel ({ pixelY }) {
        this.y.target += pixelY
    }

    /* Update */
    update () {
        if (!this.bounds) return

        this.scroll.target = GSAP.utils.clamp(-this.scroll.limit, 0 , this.scroll.target)

        this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)

        if (this.scroll.last < this.scroll.current) {
            this.scroll.direction = 'right'
        } else if (this.scroll.last > this.scroll.current) {
            this.scroll.direction = 'left'
        }

        this.scroll.last = this.scroll.current

        map(this.medias, (media, index) => {
            media.update(this.scrol.current)
        })
    }

    /* Destory */

    destroy () {
        this.scene.removeChild(this.group)
    }
}