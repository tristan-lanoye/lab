import './main.scss'

import Barba from 'barba.js'
import anime from 'animejs'

import Parallax from './scripts/Parallax'

import initIndex from './components/index/initIndex'
import initChapter from './components/initChapter'


const init = () => {
	const parallax = new Parallax()
	const barbaContainer = document.querySelector('.barba-container')
	let points

	if(document.querySelector('.point')) {
		points = Array.from(document.querySelectorAll('.point'))
	}

	const offs = Array.from(document.querySelectorAll('.off'))
	for(const off of offs) {
		if(off.dataset.page === barbaContainer.dataset.namespace) {
			off.volume = 1
			off.play()

			if(points !== undefined) {
				for(const point of points) {
					point.addEventListener('click', () => {
						if(off) {
							off.load()
						}
					})
				}
			}
			window.addEventListener('wheel', (e) => {
				if(off && e.deltaY > 0) {
					off.load()
				}
			})
			Barba.Dispatcher.on('newPageReady', () => {
				off.load()
			})
		}
	}

	const ambient = document.querySelector('.ambient')
	ambient.volume = 0.1

	if(document.querySelector('.video-intro')) {
		document.querySelector('.video-intro').addEventListener('ended', () => {
			ambient.play()
		})
	}
	if(document.querySelector('.skip-intro')) {
		document.querySelector('.skip-intro').addEventListener('click', () => {
			ambient.play()
		})
	}
	if(!document.querySelector('.skip-intro')) {
		if(ambient.paused) {
			ambient.play()
		}

		const checkMedia = () => {
			let currentScreen
			window.setTimeout(() => {
				currentScreen = document.querySelector('[data-screen].active')
				if(currentScreen.querySelector('.sound') || currentScreen.querySelector('.movie')) {
					ambient.pause()
				} else if(ambient.paused) {
					ambient.play()
				}
			})
		}

		window.addEventListener('wheel', () => {
			checkMedia()
		})
		if(points !== undefined) {
			for(const point of points) {
				point.addEventListener('click', () => {
					checkMedia()
				})
			}
		}
	}

	const $cursor = document.querySelector('.cursor')
	let cursorX = 0
	let cursorY = 0

	const mouse = { x: 0, y: 0 }

	document.addEventListener('mousemove', (event) => {
		mouse.x = event.clientX - 15
		mouse.y = event.clientY - 15
	})

	const $cursorPoint = document.querySelector('.cursor-fixed')

	let mousePointX = 0
	let mousePointY = 0

	const loop = () => {
		window.requestAnimationFrame(loop)

		const newCursorX = cursorX + (mouse.x - cursorX) * 0.1
		const newCursorY = Math.floor(cursorY + (mouse.y - cursorY) * 0.1 + (window.scrollY / 10))

		const distanceX = newCursorX - cursorX
		const distanceY = newCursorY - cursorY

		cursorX = newCursorX
		cursorY = newCursorY

		const scale = 1 + Math.hypot(distanceX, distanceY) / 30

		$cursor.style.transform = `translateX(${cursorX}px) translateY(${cursorY}px) scale(${scale})`

		mousePointX = mouse.x + 10
		mousePointY = mouse.y + 10 + window.scrollY
		$cursorPoint.style.transform =	 `translateX(${mousePointX}px) translateY(${mousePointY}px)`
	}
	loop()
}

const Index = Barba.BaseView.extend({
	namespace: 'index',
	onEnter: function() {
	},
	onEnterCompleted: function() {
		init()
		initIndex()
	},
	onLeave: function() {
	},
	onLeaveCompleted: function() {
	}
})
const Chapter0 = Barba.BaseView.extend({
	namespace: 'chapter0',
	onEnter: function() {
	},
	onEnterCompleted: function() {
		init()
		initChapter()
	},
	onLeave: function() {
	},
	onLeaveCompleted: function() {
	}
})
const Chapter1 = Barba.BaseView.extend({
	namespace: 'chapter1',
	onEnter: function() {
	},
	onEnterCompleted: function() {
		init()
		initChapter()
	},
	onLeave: function() {
	},
	onLeaveCompleted: function() {
	}
})
const Chapter2 = Barba.BaseView.extend({
	namespace: 'chapter2',
	onEnter: function() {
	},
	onEnterCompleted: function() {
		init()
		initChapter()
	},
	onLeave: function() {
	},
	onLeaveCompleted: function() {
	}
})
const Chapter3 = Barba.BaseView.extend({
	namespace: 'chapter3',
	onEnter: function() {
	},
	onEnterCompleted: function() {
		init()
		initChapter()
	},
	onLeave: function() {
	},
	onLeaveCompleted: function() {
	}
})
const Chapter4 = Barba.BaseView.extend({
	namespace: 'chapter4',
	onEnter: function() {
	},
	onEnterCompleted: function() {
		init()
		initChapter()
	},
	onLeave: function() {
	},
	onLeaveCompleted: function() {
	}
})
const Chapter5 = Barba.BaseView.extend({
	namespace: 'chapter5',
	onEnter: function() {
	},
	onEnterCompleted: function() {
		init()
		initChapter()
	},
	onLeave: function() {
	},
	onLeaveCompleted: function() {
	}
})

Index.init()
Chapter0.init()
Chapter1.init()
Chapter2.init()
Chapter3.init()
Chapter4.init()
Chapter5.init()

Barba.Pjax.start()

let isAnimating = false

const SweepTransition = Barba.BaseTransition.extend({
	start: function() {
		const bars = Array.from(document.querySelectorAll('.bar-transition'))

		isAnimating = true

		const timeline = anime.timeline()
		const sequence = []

		bars.map((bar) => {
			sequence.push({
				targets: bar,
				duration: bar.dataset.duration,
				scaleX: ['0', '1'],
				easing: 'easeInExpo',
				offset: 0
			})
		})

		timeline
			.add(sequence[0])
			.add(sequence[1])
			.add(sequence[2])
			.add(sequence[3])

		Promise
			.all([this.newContainerLoading, timeline.finished])
			.then(() => {
				this.done()
			})
			.then(this.finish.bind(this))
	},

	finish: function() {
		const bars = Array.from(document.querySelectorAll('.bar-transition'))

		const timeline = anime.timeline()
		const sequence = []

		bars.map((bar) => {
			bar.style.transformOrigin = '100% 0%'
			sequence.push({
				targets: bar,
				duration: bar.dataset.duration,
				scaleX: ['1', '0'],
				easing: 'easeOutQuint',
				offset: 0
			})
		})

		timeline
			.add(sequence[0])
			.add(sequence[1])
			.add(sequence[2])
			.add(sequence[3])

		timeline.finished.then(() => {
			bars.map((bar) => {
				bar.style.transformOrigin = '0 0'
			})
			isAnimating = false
		})
	},
	valid: function() {
		return !isAnimating
	}
})

const HideShowTransition = Barba.BaseTransition.extend({
	start: function() {
		this.newContainerLoading.then(this.finish.bind(this))
	},

	finish: function() {
		this.done()
	}
})

Barba.Pjax.getTransition = function() {
	if(SweepTransition.valid()) {
		return SweepTransition
	} else{
		return HideShowTransition
	}
}
