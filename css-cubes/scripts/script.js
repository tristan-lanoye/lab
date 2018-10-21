const frontGroup = document.querySelectorAll('.F')
const backGroup = document.querySelectorAll('.B')
const topGroup = document.querySelectorAll('.group-top')
const bottomGroup = document.querySelectorAll('.group-bottom')
const rightGroup = document.querySelectorAll('.group-right')
const leftGroup = document.querySelectorAll('.group-left')
let intervalValue = 0

setInterval(function () {
    intervalValue++;
    if (intervalValue >= 7) {
        toggleAnimation()
        intervalValue = 0
    }
}, 1000)
const toggleAnimation = () => {
    setTimeout(function () {
        for (let i = 0; i < topGroup.length; i++) {
            topGroup[i].classList.toggle('animation-top-go')
            topGroup[i].classList.toggle('animation-top-back')
        }
        for (let i = 0; i < bottomGroup.length; i++) {
            bottomGroup[i].classList.toggle('animation-bottom-go')
            bottomGroup[i].classList.toggle('animation-bottom-back')
        }
    }, 1000)

    setTimeout(function () {
        for (let i = 0; i < leftGroup.length; i++) {
            leftGroup[i].classList.toggle('animation-left-go')
            leftGroup[i].classList.toggle('animation-left-back')
        }
        for (let i = 0; i < rightGroup.length; i++) {
            rightGroup[i].classList.toggle('animation-right-go')
            rightGroup[i].classList.toggle('animation-right-back')
        }
    }, 3000)

    setTimeout(function () {
        for (let i = 0; i < frontGroup.length; i++) {
            frontGroup[i].classList.toggle('animation-front-go')
            frontGroup[i].classList.toggle('animation-front-back')
        }
        for (let i = 0; i < backGroup.length; i++) {
            backGroup[i].classList.toggle('animation-back-go')
            backGroup[i].classList.toggle('animation-back-back')
        }
    }, 6000)
}