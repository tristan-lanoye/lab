// VARIABLES DECLARATION

const body = document.querySelector('body')
const cinemaBackground = document.querySelector('.cinema-background')
const videoContainer = document.querySelector('.video-container')
const videoElement = videoContainer.querySelector('video')
const videoControls = videoContainer.querySelector('.video-controls')
const videoInfos = videoContainer.querySelector('.video-infos')
const controlsButton = videoContainer.querySelectorAll('a.controls-button')

const introScreen = document.querySelector('.intro-screen')
const introSpan = document.querySelector('.intro-screen span')

const buttonPlay = videoContainer.querySelector('.controls-button-play')
const buttonFullscreen = videoContainer.querySelector('.controls-button-fullscreen')
const buttonVolume = videoContainer.querySelector('.controls-button-volume')
const buttonInfo = videoContainer.querySelector('.controls-button-info')
const infoTitle = videoContainer.querySelector('.info-title')

const timeLettersGone = videoContainer.querySelector('.time-gone')
const timeLettersTotal = videoContainer.querySelector('.time-total')

const timeContainer = videoContainer.querySelector('.time-container')
const timeBarGone = videoContainer.querySelector('.time-bar-gone')
const timeBarTotal = videoContainer.querySelector('.time-bar-total')
const timeStamp = videoContainer.querySelector('.time-stamp')

const volumeContainer = videoContainer.querySelector('.volume-container')
const volumeBarGone = videoContainer.querySelector('.volume-bar-gone')
const volumeBarTotal = videoContainer.querySelector('.volume-bar-total')

const svgPrevious = videoContainer.querySelector('.svg-previous')
const svgNext = videoContainer.querySelector('.svg-next')
const svgRepeat = videoContainer.querySelector('.svg-repeat')
const svgInfo = videoContainer.querySelector('.svg-info')
const svgPlay = videoContainer.querySelector('.svg-play')
const svgPause = videoContainer.querySelector('.svg-pause')
const svgCinema = videoContainer.querySelector('.svg-cinema')
const svgFullscreen = videoContainer.querySelector('.svg-fullscreen')
const svgPartscreen = videoContainer.querySelector('.svg-partscreen')
const svgVolume = videoContainer.querySelectorAll('.svg-volume')
const svgVolumeX = videoContainer.querySelector('.svg-volume-x')
const svgVolume0 = videoContainer.querySelector('.svg-volume-0')
const svgVolume1 = videoContainer.querySelector('.svg-volume-1')
const svgVolume2 = videoContainer.querySelector('.svg-volume-2')

let clickCount = 0
let timeCount = 0
let minutesGone = 0
let secondsGone = 0
let minutesTotal = 0
let secondsTotal = 0
let secondsTemp = 0
videoElement.volume = 0.3
let dragTime = false
let dragVolume = false
let mouseHold = false
let wasPaused = false
let timeStampActive = false

// LOADED DOM FUNCTIONS 

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(function () {
        introSpan.style.opacity = '0'
    }, 1000)
    window.setTimeout(function () {
        introScreen.style.opacity = '0'
    }, 2100)
    window.setTimeout(function () {
        introScreen.style.display = 'none'
        introSpan.style.display = 'none'
    }, 2700)
})

videoElement.addEventListener('loadedmetadata', () => {
    setTime()
    // translateVideo()
})

// videoElement.addEventListener('canplay', () => {
//     console.log('video loaded') 
// })

window.addEventListener('resize', () => {
    // translateVideo()
})

// const translateVideo = () => {
//     videoContainer.style.transform = `translate(-${videoContainer.offsetWidth / 2}px, -${videoContainer.offsetHeight / 2}px)`
// }

// TIME VOLUME AND HOVER UPDATE LISTENERS

videoElement.addEventListener('timeupdate', () => { //reset player at video end 
    if (videoElement.currentTime >= videoElement.duration && videoElement.loop == false) {
        videoReset()
    }
})

videoElement.addEventListener('volumechange', () => { //update volume bar/icon 
    volumeBarGone.style.transform = `scaleX(${videoElement.volume})`
    if (!svgVolumeX.classList.contains('active')) {
        volumeIconUpdate()
    }
})

let checkMove = 0
videoContainer.addEventListener('mousemove', (e) => {
    toggleStateControls('display')
    clearTimeout(checkMove)
    checkMove = setTimeout(function () {
        toggleStateControls('hide')
    }, 1500);
})

videoContainer.addEventListener('mouseenter', () => {
    toggleStateControls('display')
})
videoContainer.addEventListener('mouseleave', () => {
    toggleStateControls('hide')
})

// MOUSE EVENT LISTENERS

timeContainer.addEventListener('mousedown', (e) => { //Allows click and drag of time bar 
    e.preventDefault()
    timeStampActive = true
    if (e.button === 0) {
        dragTime = true
        if (videoElement.classList.contains('play-active')) {
            toggleStateVideo()
        } else {
            wasPaused = true
        }
        if (!screenfull.isFullscreen) {
            const ratio = (e.clientX - videoContainer.getBoundingClientRect().left + 1) / timeContainer.offsetWidth
            const time = ratio * videoElement.duration
            videoElement.currentTime = time
        } else if (screenfull.isFullscreen) {
            const ratio = (e.clientX + 1) / timeContainer.offsetWidth
            const time = ratio * videoElement.duration
            videoElement.currentTime = time
        }

    }
})

timeContainer.addEventListener('mousemove', (e) => {
    timeStamp.style.display = 'block'
    timeStamp.style.transform = `translateX(${e.clientX - videoContainer.getBoundingClientRect().left - timeStamp.offsetWidth / 2}px)`
    const ratio = (e.clientX - videoContainer.getBoundingClientRect().left + 1) / timeContainer.offsetWidth
    const timeMinutes = Math.floor(ratio * videoElement.duration / 60)
    const timeSeconds = Math.floor(ratio * videoElement.duration % 60)
    timeSeconds < 10 ? timeStamp.innerHTML = `0${timeMinutes}:0${timeSeconds}` : timeStamp.innerHTML = `0${timeMinutes}:${timeSeconds}`
})

timeContainer.addEventListener('mouseleave', () => {
    if (timeStampActive == false) {
        timeStamp.style.display = 'none'
    }
})

document.addEventListener('mousemove', (e) => {
    if (dragTime == true) {
        if (!screenfull.isFullscreen) {
            const ratio = (e.clientX - videoContainer.getBoundingClientRect().left + 1) / timeContainer.offsetWidth
            const time = ratio * videoElement.duration
            videoElement.currentTime = time
        } else if (screenfull.isFullscreen) {
            const ratio = (e.clientX + 1) / timeContainer.offsetWidth
            const time = ratio * videoElement.duration
            videoElement.currentTime = time
        }
    }
    if (dragVolume == true) {
        if (!screenfull.isFullscreen) {
            const ratio = (e.clientX - videoContainer.getBoundingClientRect().left - volumeContainer.offsetLeft) / volumeContainer.offsetWidth
            videoElement.volume = ratio
        } else if (screenfull.isFullscreen) {
            const ratio = (e.clientX - volumeContainer.offsetLeft) / volumeContainer.offsetWidth
            videoElement.volume = ratio
        }
    }
    if (timeStampActive == true) {
        timeStamp.style.transform = `translateX(${e.clientX - videoContainer.getBoundingClientRect().left - timeStamp.offsetWidth / 2}px)`
        const ratio = (e.clientX - videoContainer.getBoundingClientRect().left + 1) / timeContainer.offsetWidth
        const timeMinutes = Math.floor(ratio * videoElement.duration / 60)
        const timeSeconds = Math.floor(ratio * videoElement.duration % 60)
        timeSeconds < 10 ? timeStamp.innerHTML = `0${timeMinutes}:0${timeSeconds}` : timeStamp.innerHTML = `0${timeMinutes}:${timeSeconds}`
    }
})

volumeContainer.addEventListener('mousedown', (e) => { //Allows click and drag of volume bar
    e.preventDefault()
    if (e.button === 0) {
        dragVolume = true
        if (!screenfull.isFullscreen) {
            const ratio = (e.clientX - videoContainer.getBoundingClientRect().left - volumeContainer.offsetLeft) / volumeContainer.offsetWidth
            videoElement.volume = ratio
        } else if (screenfull.isFullscreen) {
            const ratio = (e.clientX - volumeContainer.offsetLeft) / volumeContainer.offsetWidth
            videoElement.volume = ratio
        }
    }
})

window.addEventListener('mouseup', (e) => { //Stops mouse drag
    if (dragTime == true) {
        dragTime = false
        if (!videoElement.classList.contains('play-active') && wasPaused == false) {
            toggleStateVideo()
        } else {
            wasPaused = false
        }
    }
    if (dragVolume == true) {
        dragVolume = false
    }
    mouseHold = false
    if (timeStampActive == true) {
        timeStampActive = false
        timeStamp.style.display = 'none'
    }
})

svgPlay.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        toggleStateVideo()
    }
})
svgPause.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        toggleStateVideo()
    }
})
svgInfo.addEventListener('click', (e) => { //displays hidden info area
    e.preventDefault()
    if (e.button === 0) {
        if (!buttonInfo.classList.contains('info-active')) {
            infoTitle.style.animation = 'info-title-go 0.4s ease forwards'
        } else if (buttonInfo.classList.contains('info-active')) {
            infoTitle.style.animation = 'info-title-back 0.4s ease backwards'
        }
        buttonInfo.classList.toggle('info-active')
    }
})

svgNext.addEventListener('click', (e) => {
    e.preventDefault()
})

svgPrevious.addEventListener('click', (e) => {
    e.preventDefault()
})

svgNext.addEventListener('mousedown', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        mouseHold = true
        increaseTime()
    }
})

svgPrevious.addEventListener('mousedown', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        mouseHold = true
        reduceTime()
    }
})

svgRepeat.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        svgRepeat.classList.toggle('repeat-active')
        svgRepeat.classList.contains('repeat-active') ? videoElement.loop = true : videoElement.loop = false
    }
})

svgCinema.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        cinemaBackground.classList.toggle('active')
        svgCinema.classList.toggle('cinema-active')
        videoContainer.classList.toggle('cinema-position')
    }
})

svgFullscreen.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        screenfull.toggle(videoElement)
    }
})

svgPartscreen.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        screenfull.toggle(videoElement)
    }
})

svgVolumeX.addEventListener('mousedown', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        videoElement.muted = true
    }
})

cinemaBackground.addEventListener('mousedown', (e) => {
    e.preventDefault()
    if (e.button === 0) {
        if (cinemaBackground.classList.contains('active')) {
            cinemaBackground.classList.toggle('active')
            videoContainer.classList.toggle('cinema-position')
        }
    }
})

buttonVolume.addEventListener('mousedown', (e) => { //interactions volume icon 
    e.preventDefault()
    if (e.button === 0) {
        if (!videoElement.muted) {
            videoElement.muted = true
            for (const el of svgVolume) {
                el.classList.remove('active')
            }
            svgVolumeX.classList.add('active')
        } else if (videoElement.muted) {
            videoElement.muted = false
            for (const el of svgVolume) {
                el.classList.remove('active')
            }
            volumeIconUpdate(videoElement.volume)
        }
    }
})

videoElement.addEventListener('mousedown', (e) => { //handles single click pause/play and double click fullscreen
    e.preventDefault()
    if (e.button === 0 && Modernizr.touchevents == false) {
        clickCount++
        if (clickCount === 1) {
            singleClickTimer = setTimeout(function () {
                clickCount = 0
                toggleStateVideo()
            }, 200);
        } else if (clickCount === 2) {
            clearTimeout(singleClickTimer)
            clickCount = 0;
            screenfull.toggle(videoElement)
        }
    }
})

// KEY EVENT LISTENERS

document.addEventListener('keyup', (e) => {
    if (e.keyCode === 32 || e.keyCode === 75) {
        toggleStateVideo()
    }
    if (e.keyCode === 107 && !e.ctrlKey) {
        volumeUp()
    }
    if (e.keyCode === 109 && !e.ctrlKey) {
        volumeDown()
    }
})

videoElement.addEventListener('webkitfullscreenchange', () => {
    fullscreenIconUpdate()
    videoElement.classList.toggle('fullscreen-active')
    if (videoElement.classList.contains('fullscreen-active') && Modernizr.touchevents == false) {
        body.style.fontSize = '1.1vw'
        for (const el of controlsButton) {
            el.style.transform = 'scale(0.8)'
        }
    } else if (!videoElement.classList.contains('fullscreen-active') && Modernizr.touchevents == false) {
        body.style.fontSize = '0.9vw'
        for (const el of controlsButton) {
            el.style.transform = 'scale(1)'
        }
    } else if (videoElement.classList.contains('fullscreen-active') && Modernizr.touchevents) {
        body.style.fontSize = '5vw'
        for (const el of controlsButton) {
            el.style.transform = 'scale(1.2)'
        }
    } else if (!videoElement.classList.contains('fullscreen-active') && Modernizr.touchevents) {
        body.style.fontSize = '0.9vw'
        for (const el of controlsButton) {
            el.style.transform = 'scale(1)'
        }
    }
})

// PLAYSTATE FUNCTIONS 

const toggleStateVideo = () => {
    if (!videoElement.classList.contains('play-active')) {
        videoElement.play()
        svgPlay.classList.remove('active')
        svgPause.classList.add('active')
    } else if (videoElement.classList.contains('play-active')) {
        (videoElement.pause())
        svgPlay.classList.add('active')
        svgPause.classList.remove('active')
    }
    videoElement.classList.toggle('play-active')
}

const toggleStateControls = (state) => {
    if (state === 'hide' && videoControls.classList.contains('controls-active')) {
        videoInfos.classList.remove('infos-active')
        videoControls.classList.remove('controls-active')
    } else {
        videoInfos.classList.add('infos-active')
        videoControls.classList.add('controls-active')
    }
}

const videoReset = () => {
    videoElement.currentTime = 0
    toggleStateVideo()
}

// TIME FUNCTIONS

const setTime = () => { //Inner HTML with total minutes and seconds
    minutesTotal = Math.floor(videoElement.duration / 60)
    secondsTotal = Math.floor(videoElement.duration % 60)

    secondsTotal >= 0 && secondsTotal < 10 ? timeLettersTotal.innerHTML = `${minutesTotal}:0${secondsTotal}` : timeLettersTotal.innerHTML = `${minutesTotal}:${secondsTotal}`
}

const updateTime = () => { //Update time bar 60 times per second
    const ratio = videoElement.currentTime / videoElement.duration
    timeBarGone.style.transform = `scaleX(${ratio})`

    let timeCount = Math.floor(videoElement.currentTime)
    minutesGone = Math.floor(timeCount / 60)
    secondsGone = timeCount % 60

    if (secondsGone != secondsTemp) {
        secondsTemp = secondsGone
        secondsGone >= 0 && secondsGone < 10 ? timeLettersGone.innerHTML = `${minutesGone}:0${secondsGone}` : timeLettersGone.innerHTML = `${minutesGone}:${secondsGone}`
    }
    requestAnimationFrame(updateTime)
}
requestAnimationFrame(updateTime)

const increaseTime = () => { //allows hold to advance, updates 60 times per second while mousedown
    if (mouseHold) {
        videoElement.currentTime += 0.5
        setTimeout(increaseTime, 1000 / 60)
    }
}
const reduceTime = () => {
    if (mouseHold) {
        videoElement.currentTime -= 0.5
        setTimeout(reduceTime, 1000 / 60)
    }
}

// VOLUME FONCTIONS

const volumeUp = () => {
    videoElement.volume = Math.min(1, videoElement.volume + 0.1)
    volumeIconUpdate(videoElement.volume)
}
const volumeDown = () => {
    videoElement.volume = Math.max(0, videoElement.volume - 0.1)
    volumeIconUpdate(videoElement.volume)
}

const volumeIconUpdate = () => {
    const volume = videoElement.volume
    if (volume === 0 && !svgVolume0.classList.contains('active')) {
        for (const el of svgVolume) {
            el.classList.remove('active')
        }
        svgVolume0.classList.add('active')
    } else if (volume > 0 && volume < 0.5 && !svgVolume1.classList.contains('active')) {
        for (const el of svgVolume) {
            el.classList.remove('active')
        }
        svgVolume1.classList.add('active')
    } else if (volume >= 0.5 && !svgVolume2.classList.contains('active')) {
        for (const el of svgVolume) {
            el.classList.remove('active')
        }
        svgVolume2.classList.add('active')
    }
    videoElement.muted = false
}

// FULLSCREEN FUNCTIONS

const fullscreenIconUpdate = () => {
    svgFullscreen.classList.toggle('active')
    svgPartscreen.classList.toggle('active')
}