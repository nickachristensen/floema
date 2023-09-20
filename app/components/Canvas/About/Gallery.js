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

        this.scroll = {
            current: 0,
            target: 0,
            last: 0,
            lerp: 0.1
        }
        
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

       /* Events */
       onResize (event) {
        
        this.bounds = this.element.getBoundingClientRect()
        
        this.sizes = event.sizes
        
        this.width = this.bounds.width / window.innerWidth * this.sizes.width

        this.scroll = 0

        map(this.medias, media => media.onResize(event, this.scroll))
    } 

    onTouchDown ({ x, y }) {
        this.scroll.current = this.scroll
    }

    onTouchMove ({ x, y }) {
        const xDistance = x.start - x.end

        this.scroll.target = this.scroll.current - distance
    }

    onTouchUp ({ x, y }) {
        
    }

    /* Update */
    update () {
        if (!this.bounds) return
        
        if (this.scroll.current < this.scroll.target) {
            this.x.direction = 'right'
        } else if (this.scroll.current > this.scroll.target) {
            this.x.direction = 'left'
        }

        this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, this.scroll.lerp)
        
        map(this.medias, (media, index) => {
            const scaleX = media.mesh.position.x / 2

            if (this.direction === 'left') {
                const x = media.mesh.position.x + scaleX
                
                if (x < -this.sizes.width / 2) {
                    media.extra.x += this.gallerySizes.width  
                    media.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.03, Math.PI * 0.03)
                }
            } else if (this.x.direction ==='right') {
                const x = media.mesh.position.x - scaleX

                if (x > this.sizes.width / 2) {
                    media.extra.x -= this.gallerySizes.width
                    media.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.03, Math.PI * 0.03)
                }
            }

            const scaleY = media.mesh.position.y / 2

            if (this.y.direction === 'top') {
                const y = media.mesh.position.y + scaleY
                
                if (y < -this.sizes.height / 2) {
                    media.extra.y += this.gallerySizes.height
                    media.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.03, Math.PI * 0.03)
                }
            } else if (this.y.direction ==='bottom') {
                const y = media.mesh.position.y - scaleY

                if (y > this.sizes.height / 2) {
                    media.extra.y -= this.gallerySizes.height
                    media.mesh.rotation.z = GSAP.utils.random(-Math.PI * 0.03, Math.PI * 0.03)
                }
            }

            media.update(this.scroll)
        })
    }
}