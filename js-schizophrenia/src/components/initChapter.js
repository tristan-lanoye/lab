import anime from 'animejs'
import Barba from 'barba.js'

const initChapter = () => {
	let canChangeUp = true
	let canChangeDown = false
	let aside = false
	const screens = Array.from(document.querySelectorAll('[data-screen]'))
	const progressBar = document.querySelector('.progress-bar .progress-bg')
	const titleBars = Array.from(document.querySelectorAll('.title-bar'))
	const points = Array.from(document.querySelectorAll('.progress-bar .point'))
	const audioMenu = document.querySelector('.audio-menu')
	const barbaContainer = document.querySelector('.barba-container')
	audioMenu.volume = 0.1

	const transitionElements = []

	for(const screen of screens) {
		transitionElements.push({
			first: Array.from(screen.querySelectorAll('[data-transition="1"]'))
		})
	}

	const state = {
		screen: 0,
		page: barbaContainer.dataset.namespace
	}

	const wavesurfers = [null, null, null, null]

	const initMusic = () => {
		const sounds = Array.from(document.querySelectorAll('.player'))

		for(const sound of sounds) {
			const controls = Array.from(sound.querySelectorAll('svg'))
			const play = sound.querySelector('svg.feather-play-circle')
			const pause = sound.querySelector('svg.feather-pause-circle')

			const wavesurfer = WaveSurfer.create({
				container: sound,
				waveColor: 'rgba(200, 200, 200, 0.75)',
				progressColor: 'rgba(246, 206, 111, 0.8)'
			})
			wavesurfer.load(sound.dataset.url)
			wavesurfer.setVolume(0.04)

			wavesurfers[sound.dataset.ref] = wavesurfer

			Barba.Dispatcher.on('newPageReady', (e) => {
				wavesurfer.destroy()
			})

			wavesurfer.on('play', () => {
				pause.classList.add('active')
				play.classList.remove('active')
			})
			wavesurfer.on('pause', () => {
				pause.classList.remove('active')
				play.classList.add('active')
			})

			for(const control of controls) {
				control.addEventListener('click', (e) => {
					if(e.currentTarget.dataset.type === 'pause' && wavesurfer.isPlaying()) {
						wavesurfer.pause()
					} else if(e.currentTarget.dataset.type === 'play' && !wavesurfer.isPlaying()) {
						wavesurfer.playPause()
					}
				})
			}
		}
	}
	if(document.querySelector('.player')) {
		initMusic()
	}

	let videos = [null, null, null, null]

	const initVideo = () => {
		const videosEl = Array.from(document.querySelectorAll('video'))

		for(const video of videosEl) {
			videos[video.dataset.ref] = video
			video.volume = 0.1

			Barba.Dispatcher.on('newPageReady', (e) => {
				videos = [null, null, null, null]
			})
		}
	}
	if(document.querySelector('video')) {
		initVideo()
	}

	const changeScreen = (direction, destination) => {
		canChangeUp = false
		canChangeDown = false
		const current = screens[state.screen]
		if(wavesurfers[state.screen] !== null) {
			wavesurfers[state.screen].pause()
		}
		if(videos[state.screen] !== null) {
			videos[state.screen].pause()
		}

		if(direction === 'up') {
			let next
			let nextIndex
			if(destination !== undefined) {
				next = screens[destination]
				nextIndex = next.dataset.screen
			} else{
				next = screens[state.screen + 1]
				nextIndex = state.screen + 1
			}
			progressBar.dataset.state = nextIndex
			current.classList.remove('active')
			next.classList.add('active')

			const timeline = anime.timeline()

			timeline
				.add({
					targets: current,
					opacity: 0,
					offset: 200,
					duration: 400,
					easing: 'easeInOutQuad'
				})
				.add({
					targets: transitionElements[state.screen].first,
					opacity: 0,
					duration: 400,
					translateY: '-= 20',
					delay: function(target, index) {
						return index * 100
					},
					easing: 'easeInOutQuad',
					offset: 0
				})
				.add({
					targets: next,
					opacity: [0, 1],
					duration: 500,
					easing: 'easeInOutQuad'
				})
				.add({
					targets: transitionElements[nextIndex].first,
					opacity: [0, 1],
					duration: 400,
					translateY: ['-= 20', 0],
					delay: function(target, index) {
						return index * 100
					},
					easing: 'easeOutQuad',
					offset: '-=250'
				})

			timeline.finished.then(() => {
				state.screen = parseInt(nextIndex)

				if(wavesurfers[state.screen] !== null) {
					wavesurfers[state.screen].play()
				}
				if(videos[state.screen] !== null) {
					videos[state.screen].play()
				}

				if(state.screen >= screens.length - 1) {
					canChangeUp = false
					canChangeDown = true
				} else{
					canChangeDown = true
					canChangeUp = true
				}
			})
		} else if(direction === 'down') {
			let next
			let nextIndex
			if(destination !== undefined) {
				next = screens[destination]
				nextIndex = next.dataset.screen
			} else{
				next = screens[state.screen - 1]
				nextIndex = state.screen - 1
			}

			progressBar.dataset.state = nextIndex
			current.classList.remove('active')
			next.classList.add('active')

			const timeline = anime.timeline()

			timeline
				.add({
					targets: current,
					opacity: 0,
					offset: 200,
					duration: 400,
					easing: 'easeInOutQuad'
				})
				.add({
					targets: transitionElements[state.screen].first,
					opacity: 0,
					duration: 400,
					translateY: '+= 20',
					delay: function(target, index) {
						return index * 100
					},
					easing: 'easeInOutQuad',
					offset: 0
				})
				.add({
					targets: next,
					opacity: [0, 1],
					duration: 500,
					easing: 'easeInOutQuad'
				})
				.add({
					targets: transitionElements[nextIndex].first,
					opacity: [0, 1],
					duration: 400,
					translateY: ['-20', 0],
					delay: function(target, index) {
						return index * 100
					},
					easing: 'easeOutQuad',
					offset: '-=250'
				})

			timeline.finished.then(() => {
				state.screen = parseInt(nextIndex)

				if(wavesurfers[state.screen] !== null) {
					wavesurfers[state.screen].play()
				}
				if(videos[state.screen] !== null) {
					videos[state.screen].play()
				}

				if(state.screen === 0) {
					canChangeUp = true
					canChangeDown = false
				} else{
					canChangeUp = true
					canChangeDown = true
				}
			})
		}
	}
	window.addEventListener('keydown', (e) => {
		if(!aside && canChangeUp && e.keyCode === 40) {
			changeScreen('up')
		} else if(!aside && canChangeDown && e.keyCode === 38) {
			changeScreen('down')
		}
	})
	window.addEventListener('wheel', (e) => {
		const current = Barba.HistoryManager.currentStatus().namespace
		const url =  window.location.href
		if(!aside && canChangeUp && e.deltaY > 0) {
			changeScreen('up')
		} else if(!aside && canChangeDown && e.deltaY < 0) {
			changeScreen('down')
		} else if(state.screen === 3 && !aside && canChangeDown && url.includes(current, 0)) {
			if(current.includes('chapter0', 0)) {
				window.location.href = '/chapter1.html'
			} else if(current.includes('chapter1', 0)) {
				window.location.href = '/chapter2.html'
			} else if(current.includes('chapter2', 0)) {
				window.location.href = '/chapter3.html'
			} else if(current.includes('chapter3', 0)) {
				window.location.href = '/chapter4.html'
			} else if(current.includes('chapter4', 0)) {
				window.location.href = '/chapter5.html'
			}
		}
	})

	for(const point of points) {
		point.addEventListener('click', (e) => {
			const anchor = e.currentTarget.dataset.anchor
			if(anchor > state.screen && canChangeUp) {
				changeScreen('up', anchor)
			} else if(anchor < state.screen && canChangeDown) {
				changeScreen('down', anchor)
			}
		})
	}

	const menuButton = document.querySelector('.menu-svg')
	const menu = document.querySelector('.menu')
	const menuCircle = document.querySelector('.feather-circle circle')
	const circleLength = menuCircle.getTotalLength() + 0.5
	menuCircle.style.strokeDasharray = circleLength

	const transitionElements2 = Array.from(document.querySelectorAll('[data-transition="2"]'))
	const transitionElements3 = Array.from(document.querySelectorAll('[data-transition="3"]'))


	const changeMenu = () => {
		if(!menu.classList.contains('active')) {
			menu.classList.add('active')
			menuButton.classList.add('active')
			aside = true

			if(wavesurfers[state.screen] !== null) {
				wavesurfers[state.screen].pause()
			}
			if(videos[state.screen] !== null) {
				videos[state.screen].pause()
			}

			window.setTimeout(() => {
				audioMenu.play()
			}, 500)

			const timeline = anime.timeline()

			timeline
				.add({
					targets: menuCircle,
					strokeDashoffset: circleLength,
					easing: 'easeInOutQuad',
					duration: 350
				})
				.add({
					targets: transitionElements[state.screen].first,
					duration: 300,
					translateY: '+= 10',
					delay: function(target, index) {
						return - index * 100
					},
					easing: 'easeInOutQuad',
					opacity: 0,
					offset: 0
				})
				.add({
					targets: titleBars,
					easing: 'easeInOutQuad',
					duration: 350,
					scaleX: 0,
					offset: 0
				})
				.add({
					targets: menu,
					opacity: 1,
					duration: 350,
					easing: 'easeInOutQuad',
					offset: 500
				})
				.add({
					targets: transitionElements2,
					opacity: [0, 1],
					duration: 300,
					translateY: ['-20', 0],
					delay: function(target, index) {
						return index * 75
					},
					easing: 'easeOutQuad'
				})
				.add({
					targets: transitionElements3,
					opacity: [0, 1],
					duration: 300,
					translateY: ['-20', 0],
					delay: function(target, index) {
						return index * 75
					},
					easing: 'easeOutQuad'
				})
		} else{
			menu.classList.remove('active')
			menuButton.classList.remove('active')
			aside = false

			if(wavesurfers[state.screen] !== null) {
				wavesurfers[state.screen].play()
			}
			if(videos[state.screen] !== null) {
				videos[state.screen].play()
			}

			const timeline = anime.timeline()

			timeline
				.add({
					targets: transitionElements3,
					opacity: 0,
					duration: 300,
					translateY: '-=20',
					delay: function(target, index) {
						return index * 75
					},
					easing: 'easeOutQuad'
				})
				.add({
					targets: transitionElements2,
					opacity: 0,
					duration: 300,
					translateY: '-=20',
					delay: function(target, index) {
						return index * 75
					},
					easing: 'easeOutQuad'
				})
				.add({
					targets: menu,
					opacity: 0,
					duration: 350,
					easing: 'easeInOutQuad'
				})
				.add({
					targets: menuCircle,
					strokeDashoffset: 0,
					easing: 'easeInOutQuad',
					duration: 350
				})
				.add({
					targets: transitionElements[state.screen].first,
					duration: 400,
					translateY: ['-= 10', 0],
					delay: function(target, index) {
						return index * 150
					},
					easing: 'easeInOutQuad',
					opacity: 1,
					offset: '-=150'
				})
				.add({
					targets: titleBars,
					duration: 400,
					easing: 'easeInOutQuad',
					scaleX: 1,
					offset: '-=400'
				})
		}
	}
	menuButton.addEventListener('click', changeMenu)

	const infos = document.querySelector('.infos')
	const infosOverlay = document.querySelector('.infos .overlay')
	const infosContainer = document.querySelector('.infos .container')
	const infosButton = document.querySelector('.options .feather-info')

	infosButton.addEventListener('click', () => {
		if(!infos.classList.contains('active')) {
			infos.classList.add('active')
			infosContainer.classList.add('active')
			infosButton.classList.add('active')
			aside = true
		} else{
			infos.classList.remove('active')
			infosContainer.classList.remove('active')
			infosButton.classList.remove('active')
			aside = false
		}
	})

	infosOverlay.addEventListener('click', () => {
		if(infos.classList.contains('active')) {
			infos.classList.remove('active')
			infosContainer.classList.remove('active')
			infosButton.classList.remove('active')
			aside = false
		}
	})

	const changeCircles = () => {
		const title = document.querySelector('.menu .data-container .title')
		const dates = document.querySelector('.menu .data-container .dates')
		const bg = document.querySelector('.menu .img-container .bg')
		const front = document.querySelector('.menu .img-container .front')

		const circles = Array.from(document.querySelectorAll('.menu .data-container .cir'))

		for(const circle of circles) {
			circle.addEventListener('mouseover', (e) => {
				switch(e.currentTarget.dataset.cir) {
					case '0':
						title.innerHTML = 'De folie à Schizophrénie'
						dates.innerHTML = '1898 - 1911'
						bg.src = 'static/images/00_bg0a.png'
						front.src = 'static/images/00_bg0b.png'
						break
					case '1':
						title.innerHTML = 'Une période de tests'
						dates.innerHTML = '1911 - 1945'
						bg.src = 'static/images/01_bg0a.png'
						front.src = 'static/images/01_bg0b.png'
						break
					case '2':
						title.innerHTML = 'Durant les trentes glorieuses'
						dates.innerHTML = '1945 - 1970'
						bg.src = 'static/images/02_bg0a.png'
						front.src = 'static/images/02_bg0b.png'
						break
					case '3':
						title.innerHTML = 'Une remise en cause'
						dates.innerHTML = '1970 - 2000'
						bg.src = 'static/images/03_bg0a.png'
						front.src = 'static/images/03_bg0b.png'
						break
					case '4':
						title.innerHTML = 'De nos jours...'
						dates.innerHTML = '2000 - Aujourd\'hui'
						bg.src = 'static/images/04_bg0a.png'
						front.src = 'static/images/04_bg0b.png'
						break
					case '5':
						title.innerHTML = 'Un avenir incertain'
						dates.innerHTML = 'Aujourd\'hui - /'
						bg.src = 'static/images/05_bg0a.png'
						front.src = 'static/images/05_bg0b.png'
						break
				}
			})
		}
	}

	changeCircles()

	if(document.querySelector('.plus')) {
		const plusses = Array.from(document.querySelectorAll('.plus'))

		for(const plus of plusses) {
			const screen = plus.dataset.plus
			const plusOverlay = plus.querySelector('.overlay')
			const plusContainer = plus.querySelector('.container')
			const plusButton = document.querySelector(`[data-screen="${screen}"] .more`)

			plusButton.addEventListener('click', () => {
				if(!plus.classList.contains('active')) {
					plus.classList.add('active')
					plusContainer.classList.add('active')
					plusButton.classList.add('active')
					aside = true
				} else{
					plus.classList.remove('active')
					plusContainer.classList.remove('active')
					plusButton.classList.remove('active')
					aside = false
				}
			})

			plusOverlay.addEventListener('click', () => {
				if(plus.classList.contains('active')) {
					plus.classList.remove('active')
					plusContainer.classList.remove('active')
					plusButton.classList.remove('active')
					aside = false
				}
			})
		}
	}



	const changeSymptome = () => {
		const subtitles = document.querySelector('.subtitle')
		const symptomes = Array.from(document.querySelectorAll('.symptomes'))

		for(const symptome of symptomes) {
			symptome.addEventListener('click', (e) => {
				switch(e.currentTarget.dataset.choice) {
					case '1':
						subtitles.innerHTML = 'Se caractérise par la prédominance des idées délirantes de persécution, le délire interprétatif, les convictions d\'être l\'objet d\'un complot ou de se trouver au centre d\'une intrigue malveillante, la surestimation de soi (les idées de "grandeur", voire de "mission planétaire"), l\'anxiété, l\'envie ou la jalousie, un esprit contestataire, revendicateur et belliqueux.'
						break
					case '2':
						subtitles.innerHTML = 'Se caractérise par l\'hyperactivité, le manque de concentration, la confusion dans les idées et le discours, le manque de tact et l\'excès de familiarité, le comportement inepte et l\'indifférence des sentiments.'
						break
					case '3':
						subtitles.innerHTML = 'Le malade se fige obstinément dans l\'immobilité et le mutisme et ne réagit pas aux tentatives entreprises pour l\'en sortir. Les efforts faits par les proches pour sortir le malade de ses attitudes ou positions bizarrement figées (paralysie "cireuse") peuvent leur donner l\'impression que leur malade est comme "paralysé". Cet état peut être entrecoupé par des épisodes d\'activité physique excessive et désordonnée. Cette forme est moins souvent signalée de nos jours, sans qu\'on sache à quoi attribuer cette moindre fréquence.'
						break
					case '4':
						subtitles.innerHTML = 'Après un ou deux épisodes aigus (c.à.d. avec symptômes "positifs"), ce sont ensuite, avec peu ou pas de symptômes "positifs", le repli sur soi, l\'absence de volonté et de motivation ("l\'aboulie") et l\'indécision, le comportement excentrique, la confusion des pensées, la pauvreté du discours et leur incohérence, l\'anhédonie 0, l\'apathie et la passivité qui semblent passer à l\'avant-plan (certains parlent de "syndrome désorganisé").'
						break
					case '5':
						subtitles.innerHTML = 'Ce sont les formes inclassables du fait qu\'on y retrouve un mélange des éléments propres aux autres formes. Il faut signaler aussi qu\'un même malade peut présenter successivement plusieurs de ces formes.'
						break
				}
			})
		}
	}
	changeSymptome()
}

export default initChapter
