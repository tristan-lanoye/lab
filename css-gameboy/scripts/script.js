const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = 150
canvas.height = 115

const gameboy = document.querySelector('.gameboy')
const buttonLeft = gameboy.querySelector('.cross-left')
const buttonRight = gameboy.querySelector('.cross-right')
const buttonUp = gameboy.querySelector('.cross-up')
const buttonDown = gameboy.querySelector('.cross-down')
const buttonA = gameboy.querySelector('.button-a')
const buttonB = gameboy.querySelector('.button-b')

const rangex = document.querySelector('.rangeRotateX')
const rangey = document.querySelector('.rangeRotateY')
const rangez = document.querySelector('.rangeRotateZ')

let moving = false
let shooting = false
let frameCount = 0
let lastShot = 0

let missiles = []
let enemies = []

setInterval(function () {
    gameboy.style.transform = 'rotateX(' + rangex.value + 'deg) rotateY(' + rangey.value + 'deg) rotateZ(' + rangez.value + 'deg)'

    const enemy = new Enemy(canvas.width + 10, Math.floor(Math.random() * canvas.height))
    enemies.push(enemy)
}, 200)

buttonLeft.addEventListener('mousedown', (e) => {
    if (!moving) {
        moving = true
        spaceship.left = 1
    }
})
buttonRight.addEventListener('mousedown', (e) => {
    if (!moving) {
        moving = true
        spaceship.right = 1
    }
})
buttonUp.addEventListener('mousedown', (e) => {
    if (!moving) {
        moving = true
        spaceship.up = 1
    }
})
buttonDown.addEventListener('mousedown', (e) => {
    if (!moving) {
        moving = true
        spaceship.down = 1
    }
})
buttonA.addEventListener('mousedown', (e) => {
    e.preventDefault()
    shooting = true
})
buttonB.addEventListener('mousedown', (e) => {
    e.preventDefault()
    shooting = true
})

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 38) {
        if (!moving) {
            moving = true
            spaceship.up = 1
        }
    }
    if (e.keyCode === 39) {
        if (!moving) {
            moving = true
            spaceship.right = 1
        }
    }
    if (e.keyCode === 40) {
        if (!moving) {
            moving = true
            spaceship.down = 1
        }
    }
    if (e.keyCode === 37) {
        if (!moving) {
            moving = true
            spaceship.left = 1
        }
    }
    if (e.keyCode === 65) {
        shooting = true
    }
    if (e.keyCode === 66) {
        shooting = true
    }
})

window.addEventListener('keyup', (e) => {
    if (e.keyCode === 38) {
        spaceship.up = 0
        moving = false
    }
    if (e.keyCode === 39) {
        spaceship.right = 0
        moving = false
    }
    if (e.keyCode === 40) {
        spaceship.down = 0
        moving = false
    }
    if (e.keyCode === 37) {
        spaceship.left = 0
        moving = false
    }
    shooting = false
})

window.addEventListener('mouseup', (e) => {
    moving = false
    shooting = false
    spaceship.up = 0
    spaceship.down = 0
    spaceship.right = 0
    spaceship.left = 0
})

class Spaceship {
    constructor() {
        this.x = canvas.width / 10
        this.y = canvas.height / 2
        this.left = 0
        this.right = 0
        this.up = 0
        this.down = 0
    }

    display() {
        this.x += (this.right - this.left) * 2.5
        this.y -= (this.up - this.down) * 2.5

        ctx.fillStyle = '#fefefe'
        ctx.fillRect(this.x, this.y, 10, 10)
    }
}

class Missile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = 2
    }

    checkCollision() {
        for (let i = 0; i < enemies.length; i++) {
            if (this.x + 5 > enemies[i].x &&
                this.x < enemies[i].x + 10 &&
                this.y < enemies[i].y + 20 &&
                this.y + 2 > enemies[i].y) {
                enemies.splice(i, 1)
            }
        }
    }

    display() {
        this.x += this.vx
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.x, this.y, 5, 2)
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = 2
    }

    display() {
        this.x -= this.vx

        ctx.fillStyle = '#00ff00'
        ctx.fillRect(this.x, this.y, 10, 10)
    }
}

const spaceship = new Spaceship()

function updateCanvas() {
    frameCount++

    ctx.fillStyle = 'rgba(34,34,34,0.9)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    spaceship.display()

    if (shooting && frameCount - lastShot > 10) {
        const missile = new Missile(spaceship.x + 5, spaceship.y + 5)
        missiles.push(missile)

        lastShot = frameCount
    }

    for (const missile of missiles) {
        missile.display()
        missile.checkCollision()
    }
    for (const enemy of enemies) {
        enemy.display()
    }

    requestAnimationFrame(updateCanvas)
}
updateCanvas()