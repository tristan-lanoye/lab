import Barba from 'barba.js'
import anime from 'animejs'

const initIndex = () => {
	const video = document.querySelector('.video-intro')
	const menu = document.querySelector('.menu-index')
	const circles = Array.from(menu.querySelectorAll('.data-container .cir'))
	const transitionElements1 = Array.from(menu.querySelectorAll('[data-transition="1"]'))
	const transitionElements2 = Array.from(menu.querySelectorAll('[data-transition="2"]'))
	const introOverlay = document.querySelector('.intro-overlay')
	const skipIntro = document.querySelector('.skip-intro')
	const playButton = document.querySelector('.play')

	video.volume = 0.2

	playButton.addEventListener('click', () => {
		anime({
			targets: playButton,
			opacity: 0,
			duration: 550,
			easing: 'easeInOutQuad'
		})
		window.setTimeout(() => {
			introOverlay.classList.add('inactive')
			anime({
				targets: skipIntro,
				opacity: 1,
				duration: 350,
				easing: 'easeInOutQuad'
			})
		}, 2000)
		video.play()
	})

	const audioMenu = document.querySelector('.audio-menu')

	audioMenu.volume = 0.1

	const bringMenu = () => {
		window.setTimeout(() => {
			audioMenu.play()
		}, 500)

		const timeline = anime.timeline()

		timeline
			.add({
				targets: skipIntro,
				opacity: 0,
				translateX: '-=30',
				duration: 350,
				easing: 'easeInOutQuad'
			})
			.add({
				targets: video,
				opacity: 0,
				duration: 300,
				easing: 'easeInOutQuad',
				offset: '-=150'
			})
			.add({
				targets: menu,
				opacity: 1,
				duration: 300,
				easing: 'easeInOutQuad'
			})
			.add({
				targets: transitionElements1,
				opacity: [0, 1],
				duration: 400,
				translateY: ['-20', 0],
				delay: function(target, index) {
					return index * 100
				},
				easing: 'easeOutQuad'
			})
			.add({
				targets: transitionElements2,
				opacity: [0, 1],
				duration: 400,
				translateY: ['-20', 0],
				delay: function(target, index) {
					return index * 100
				},
				easing: 'easeOutQuad'
			})

		timeline.finished.then(() => {
			menu.classList.add('active')
		})
	}

	skipIntro.addEventListener('click', () => {
		video.pause()
		bringMenu()
	})

	Barba.Dispatcher.on('newPageReady', () => {
		video.pause()
	})

	video.addEventListener('ended', () => {
		bringMenu()
	})

	for(const circle of circles) {
		const period = menu.querySelector('.data-container .period')
		const bg = menu.querySelector('.img-container .bg')
		const front = menu.querySelector('.img-container .front')

		circle.addEventListener('mouseover', (e) => {
			switch(e.currentTarget.dataset.cir) {
				case '0':
					period.innerHTML = '1898 - 1911'
					bg.src = 'static/images/00_bg0a.png'
					front.src = 'static/images/00_bg0b.png'
					break
				case '1':
					period.innerHTML = '1911 - 1945'
					bg.src = 'static/images/01_bg0a.png'
					front.src = 'static/images/01_bg0b.png'
					break
				case '2':
					period.innerHTML = '1945 - 1970'
					bg.src = 'static/images/02_bg0a.png'
					front.src = 'static/images/02_bg0b.png'
					break
				case '3':
					period.innerHTML = '1970 - 2000'
					bg.src = 'static/images/03_bg0a.png'
					front.src = 'static/images/03_bg0b.png'
					break
				case '4':
					period.innerHTML = '2000 - Aujourd\'hui'
					bg.src = 'static/images/04_bg0a.png'
					front.src = 'static/images/04_bg0b.png'
					break
				case '5':
					period.innerHTML = 'Aujourd\'hui - /'
					bg.src = 'static/images/05_bg0a.png'
					front.src = 'static/images/05_bg0b.png'
					break
			}
		})
	}
}

export default initIndex
