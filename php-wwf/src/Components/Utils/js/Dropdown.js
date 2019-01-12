export default class Dropdown {
    constructor(el) {
        this.el = {}
        this.el.container = el
        this.el.trigger = el.querySelector('.trigger')
        this.el.content = el.querySelector('.content')
        this.el.notificationIcon = el.querySelector('.notification-icon')

        this.open = false

        this.init()
    }

    init() {
        window.addEventListener('click', (e) => {
            if(this.open === false && (e.target === this.el.trigger || this.el.trigger.contains(e.target))) {
                if(this.el.notificationIcon) this.el.notificationIcon.classList.remove('inactive')
                this.el.container.classList.add('active')
                this.open = true
            } else if (this.open === true) {
                if(this.el.notificationIcon) this.el.notificationIcon.classList.add('inactive')
                this.el.container.classList.remove('active')
                this.open = false
            }
        })
    }
}
