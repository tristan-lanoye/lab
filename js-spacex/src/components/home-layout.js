//declare variables
const $canvas = document.querySelector('.canvas-background')
const context = $canvas.getContext('2d')
const $grid = document.querySelector('.home-grid')
const $quote = $grid.querySelector('.quote')
const $cursor = document.querySelector('.cursor')
const $cursorCircle = document.querySelector('.cursor-circle')
const $buttonHome = $grid.querySelector('.button-home')
const $scrollContainer = $grid.querySelector('.scroll-container')
const $scrollLine = $grid.querySelector('.scroll-line')
const $equalizer = $grid.querySelector('.equalizer-container')
const $theme = document.querySelector('.theme')

const domElements = Array.from($grid.querySelectorAll('[data-link]'))
const domParallax = Array.from($grid.querySelectorAll('[data-parallax]'))
const $equalizerBars = Array.from($grid.querySelectorAll('.equalizer-bar'))

//mouse coordonates
const coords = {
    x: 0,
    y: 0
}
const oldcoords = [{
    x: 0,
    y: 0
}]

//cursor coordonates
const cursorCoords = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 0
}]

//value used for parallax effect 
//~ the difference between center of the screen and mouse position
const offset = {
    x: 0,
    y: 0
}

let frameCount = 0
let wheelCount = 0
let lastWheel = 0

//arrays for stars instances 
let standardstars = []
let fallingstars = []

let standardstarscount = 300

//quotes to be displayed at random
const quotes = [
    '"When something is important enough, you do it even if the odds are not in your favor"',
    '"SpaceX designs, manufactures and launches advanced rockets and spacecraft"',
    '"I\'m not trying to be anyone\'s savior. I\'m just trying to think about the future and not be sad"'
]

//call to action
const cta = 'Discover our moments'

$canvas.width = window.innerWidth
$canvas.height = window.innerHeight

const initialize = () => {
    //generate random quote
    getQuote(quotes)

    //create 300 new standard stars
    for (let i = 0; i < standardstarscount; i++) {
        const star = new StandardStar()
        standardstars.push(star)
    }

    //start animate() loop
    animate()
}

//get a random value between min and max
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const resizeCanvas = () => {
    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
}

const getQuote = (quotes) => {
    const random = Math.random()
    //1 of 3 chance
    if (random < 0.33) {
        //get quote number 1
        //prepare temp string 
        let temp = ''
        for (let i = 0; i < quotes[0].length; i++) {
            //loop through string number 1 to get every character 
            if (quotes[0][i] == ' ') {
                //if element at index is not a character, push a space
                temp += quotes[0][i]
            } else {
                //if element is a character, push character in a span
                //each character has a specific animation class 
                //push style tag describing animation for specific character
                temp += `<span class='letter fade-in-${i}'>${quotes[0][i]}</span><style>.fade-in-${i}{animation: fade-in 0.5s ease forwards ${i*0.03}s;}</style>`
            }
        }
        //inject temp in quote 
        $quote.innerHTML = temp
    } else if (random > 0.66) {
        let temp = ''
        for (let i = 0; i < quotes[1].length; i++) {
            if (quotes[1][i] == ' ') {
                temp += quotes[1][i]
            } else {
                temp += `<span class='letter fade-in-${i}'>${quotes[1][i]}</span><style>.fade-in-${i}{animation: fade-in 0.5s ease forwards ${i*0.03}s;}</style>`
            }
        }
        $quote.innerHTML = temp
    } else {
        let temp = ''
        for (let i = 0; i < quotes[2].length; i++) {
            if (quotes[2][i] == ' ') {
                temp += quotes[2][i]
            } else {
                temp += `<span class='letter fade-in-${i}'>${quotes[2][i]}</span><style>.fade-in-${i}{animation: fade-in 0.5s ease forwards ${i*0.03}s;}</style>`
            }
        }
        $quote.innerHTML = temp
    }
    window.setTimeout(() => {
        //same with home button 
        let tempc = ''
        for (let i = 0; i < cta.length; i++) {
            if (cta[i] == ' ') {
                tempc += '&nbsp'
            } else {
                //get random number, so that animation doesn't follow a pattern 
                let rand = randomNumber(0.5, 15)
                //each letter has a specific animation delay, 
                tempc += `<span class='letter fade-in-${rand+500}'>${cta[i]}</span><style>.fade-in-${rand+500}{animation: fade-in 1s ease forwards 0.${rand}s;}</style>`
            }
        }
        $buttonHome.innerHTML = tempc
    }, 3000)
}

const cursorMove = () => {
    //update cursor coordonates based on mouse position
    cursorCoords[0].x += (coords.x - cursorCoords[0].x) / 5
    cursorCoords[0].y += (coords.y - cursorCoords[0].y) / 5
    //update cursor position using css transform 
    $cursor.style.transform = `translate(${cursorCoords[0].x + 5}px, ${cursorCoords[0].y + 4}px)`
    cursorCoords[1].x += (coords.x - cursorCoords[1].x - 4) / 1.5
    cursorCoords[1].y += (coords.y - cursorCoords[1].y - 4) / 1.5
    $cursorCircle.style.transform = `translate(${cursorCoords[1].x + 5}px, ${cursorCoords[1].y + 5}px)`
}

const cursorCheckBoundaries = (elements) => {
    //expects array of elements having attribute data-link
    for (const element of elements) {
        //loop through elements and check for collision 
        if (coords.x > element.getBoundingClientRect().left &&
            coords.x < element.getBoundingClientRect().left + element.clientWidth &&
            coords.y > element.getBoundingClientRect().top &&
            coords.y < element.getBoundingClientRect().top + element.clientHeight
        ) {
            //if collision, cursor gets bigger
            $cursorCircle.classList.add('hovering')
            return true
        } else if ($cursorCircle.classList.contains('hovering')) {
            //if no collision, cursor gets smaller
            $cursorCircle.classList.remove('hovering')
        }
    }
}

const animate = () => {
    frameCount++
    //clear canvas while animation
    context.fillStyle = 'rgb(34,34,34)'
    context.clearRect(0, 0, $canvas.width, $canvas.height)
    //animate each particle of the array

    for (const star of standardstars) {
        //loop through standard stars objects and update position
        star.move()
    }
    for (const star of fallingstars) {
        //loop through falling stars objects and update position + check borders
        star.checkBorder()
        star.display()
    }

    if (fallingstars.length < 100 && frameCount % 10 == 0) {
        //create falling stars at a constant rate 
        let random = {
            //random values for each star to pass as arguments
            x: randomNumber(100, $canvas.width + 100),
            y: randomNumber(-50, -100),
            vx: randomNumber(-3, -1),
            vy: randomNumber(1, 3),
            radius: randomNumber(1, 1.2)
        }
        const star = new FallingStar(random.x, random.y, -1, 1, random.radius)
        fallingstars.push(star)
    }

    if (frameCount - lastWheel > 10) {
        //is user hasn't scrolled for 10ms, scroll resets
        wheelCount = 0
    }
    $scrollContainer.style.transform = `translate(${offset.x}px, ${offset.y + 5 * wheelCount}px)`
    cursorMove()
    requestAnimationFrame(animate)
}

document.addEventListener('mousemove', (e) => {
    //update coordonates on mouse move
    oldcoords.x = coords.x
    oldcoords.y = coords.y

    coords.x = e.clientX
    coords.y = e.clientY

    //get offset value from the center for parallax effect 
    offset.x = ($canvas.width / 2 - e.clientX) / 30
    offset.y = ($canvas.height / 2 - e.clientY) / 30

    for (let i = 0; i < domParallax.length; i++) {
        //move all elements with data-parallax using css transform 
        domParallax[i].style.transform = `translate(${offset.x}px, ${offset.y}px)`
    }

    //parallax effect for standard stars 
    if (coords.x < oldcoords.x && coords.y < oldcoords.y) {
        for (const star of standardstars) {
            star.posx += star.speed / 5
            star.posy += star.speed / 5
        }
    } else if (coords.x < oldcoords.x && coords.y > oldcoords.y) {
        for (const star of standardstars) {
            star.posx += star.speed / 5
            star.posy -= star.speed / 5
        }
    } else if (coords.x > oldcoords.x && coords.y > oldcoords.y) {
        for (const star of standardstars) {
            star.posx -= star.speed / 5
            star.posy -= star.speed / 5
        }
    } else {
        for (const star of standardstars) {
            star.posx -= star.speed / 5
            star.posy += star.speed / 5
        }
    }

    //check cursor & dom elements collision 
    cursorCheckBoundaries(domElements)
})

$equalizer.addEventListener('click', (e) => {
    // play/pause theme music
    $theme.paused ? $theme.play() : $theme.pause()
    for (const bar of $equalizerBars) {
        bar.classList.toggle('paused')
    }
})

window.addEventListener('wheel', () => {
    wheelCount++
    console.log(wheelCount)
    //little 'validation' to avoid triggering page change too easily
    if (wheelCount >= 3) {
        //change window url 
        window.location = './timeline.html'
    }
    lastWheel = frameCount
})

window.addEventListener('resize', resizeCanvas)

initialize()

//star classes 
class FallingStar {
    constructor(x, y, vx, vy, radius) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.radius = radius
        this.color = '#006d56'
    }

    checkBorder() {
        if (this.x + this.radius < 0) {
            this.x = $canvas.width + this.radius
        }
        if (this.y > $canvas.height) {
            this.y = 0 - this.radius
        }
    }

    display() {
        this.x += this.vx
        this.y += this.vy

        context.beginPath()
        context.globalCompositeOperation = 'source-over'
        context.fillStyle = this.color
        context.globalAlpha = this.opacity
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()
    }
}

class StandardStar {
    constructor() {
        this.originSpeed = Math.floor(Math.random() * 12) / 10
        this.originRadius = (Math.random())
        this.radius = this.originRadius
        this.posx = Math.floor((Math.random() * $canvas.width) + this.radius)
        this.posy = Math.floor((Math.random() * $canvas.height) + this.radius)
        this.color = '#ffffff'
        this.speed = this.originSpeed
        this.opacity = Math.random()
        this.direction = Math.random()
    }

    move() {
        context.beginPath()
        context.globalCompositeOperation = 'source-over'
        context.fillStyle = this.color
        context.globalAlpha = this.opacity
        context.arc(this.posx, this.posy, this.radius, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()

        if (this.speed == 0) {
            this.speed = Math.floor(Math.random() * 12) / 10
        }
        this.posy += this.speed / 20

        if (this.posy > $canvas.height) {
            this.posy = 0
        }
    }
}