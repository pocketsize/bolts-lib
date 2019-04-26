/**
 * Bolts 1.0.0 | MIT License
 *
 * Developed by Pocketsize
 * http://www.pocketsize.se/
 */

import state from './state'

const detect = {
	hoverCapability,
	resizeEvents,
	imageOrientation,
}

/**
 * detectMouseEvents
 * @private
 *
 * Update the detectHover state if we find mousemove support, but not any
 * touchstart support, indicating the input method has hover support.
 *
 * @param {number} threshold - Minimum probability required to update the state
 * @param {Function} callback
 */

function detectMouseEvents(threshold = 90, callback) {
	const probability = 90

	if (!(probability >= threshold && !state.get('detect-hover'))) {
		return
	}

	if (!!('onmousemove' in window) && !('ontouchstart' in window)) {
		callback(probability)
	}
}


/**
 * detectHoverMedia
 * @private
 *
 * Update the detectHover state if the hover media query has a match.
 *
 * @param {number} threshold - Minimum probability required to update the state
 * @param {Function} callback
 */

function detectHoverMedia(threshold = 100, callback) {
	const probability = 100

	if (!(probability >= threshold && !state.get('detect-hover'))) {
		return
	}

	if (!!window.matchMedia) {
		if (window.matchMedia('(hover:hover)').matches) {
			callback(probability)
		}
	}
}


/**
 * detectMouseover
 * @private
 *
 * Detect any mouseover event and update the detectHover state.
 * Cancels testing if we find a mobile user agent, as we're
 * looking for primary input methods, and some of these devices
 * simulate this on touch events.
 *
 * @param {number} threshold - Minimum probability required to update the state
 * @param {Function} callback
 */

function detectMouseover(threshold = 100, callback) {
	const probability = 100

	if (navigator.userAgent.indexOf(/Mobile/) != -1) {
		return
	}

	if (!(probability >= threshold && !state.get('detect-hover'))) {
		return
	}

	window.addEventListener('mouseover', function onInitialHover() {
		window.removeEventListener('mouseover', onInitialHover, false)
		callback(probability)
	}, false)
}


/**
 * hoverCapability
 *
 * Checks if the device has hover or not.
 * Sets detectHover state, based on different checks.
 *
 * @param {number} threshold - Minimum probability required to update the state
 * @param {Function} callback
 */

function hoverCapability(threshold = 100) {
	const callback = (prob) => {
		state.set('detect-hover')
	}

	detectMouseEvents(threshold, callback)
	detectHoverMedia(threshold, callback)
	detectMouseover(threshold, callback)
}

/**
 * resizeEvents
 *
 * Sets a global 'resizing' state during viewport resizing.
 * Used to disable transitions/animations on resize.
 */

function resizeEvents() {
	let resizing = false

	window.addEventListener('resize', () => {
		state.set('resizing')
		if (!!resizing) clearTimeout(resizing)

		resizing = setTimeout(() => {
			state.remove('resizing')
		}, 50)
	})
}


/**
 * imageOrientation
 *
 * Sets a local orientation state to portrait/landscape/square
 * on all <img> elements based on its width/height ratio.
 */

function imageOrientation() {
	let images = document.getElementsByTagName('img')

	function setOrientationState(image) {
		let orientation = 'square'

		if (image.width > image.height) {
			orientation = 'landscape'
		} else if (image.height > image.width) {
			orientation = 'portrait'
		}

		state.set('orientation', orientation, image)
	}

	for (let i = 0; i < images.length; i++) {
		if (!images[i].naturalWidth || !images[i].naturalHeight) {
			images[i].addEventListener('load', function () {
				setOrientationState(this)
			})
		} else {
			setOrientationState(images[i])
		}
	}
}

export default detect