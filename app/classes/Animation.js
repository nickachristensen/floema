export default class Animation {
    constructor({ element }) {
        this.element = element

        this.createObserver()
    }

    createObserver() {
        this.observer = new window.IntersectionObserver(entry => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('animatein')
                } else {
                    console.log('animateout')
                }
            })
        })
        
        this.observer.observer(this.element)
    }
}