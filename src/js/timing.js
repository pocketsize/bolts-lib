/**
 * Bolts 1.0.1 | MIT License
 *
 * Developed by Pocketsize
 * http://www.pocketsize.se/
 */

const timing = {
	Interval,
	debounce,
	throttle,
}

/**
 * Interval
 *
 * A replacement for setInterval() using the requestAnimationFrame API
 * featuring a couple of useful goodies.
 *
 * Instantiated with the "new" keyword, and has two methods: .start() and .stop()
 *
 * @param {Function} callback
 * @param {number} milliseconds
 * @param {boolean} startWithCallback
 *
 * @return {Object} Interval object
 *
 */

function Interval(
	callback,
	milliseconds = 25,
	startWithCallback = false,
) {
	if (!callback) {
		throw new Error('timing.Interval — No callback provided!')
	}

	this.now       = null
	this.elapsed   = null
	this.then      = null
	this.startTime = null

	this.animationFrame = null
	this.isRunning      = false

	this.loop = (...args) => {
		this.animationFrame = window.requestAnimationFrame(this.loop)
		this.now = Date.now()
		this.elapsed = this.now - this.then

		if (this.elapsed > milliseconds) {
			this.then = this.now - (this.elapsed % milliseconds)
			callback.call(this, ...args)
		}
	}

	this.start = () => {
		if (this.isRunning) {
			return null
		}

		if (!startWithCallback) {
			this.then = Date.now()
		}

		this.loop()
		this.isRunning = true
	}

	this.stop = () => {
		if (!this.isRunning || !this.animationFrame) {
			return null
		}

		window.cancelAnimationFrame(this.animationFrame)
		this.animationFrame = null
		this.isRunning = false
	}

	return this
}

function debounce(func, delay) {
	// written by Jhey Tompkins: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
	let inDebounce
	return function () {
		const context = this
		const args = arguments
		clearTimeout(inDebounce)
		inDebounce = setTimeout(() => func.apply(context, args), delay)
	}
}

function throttle(func, limit) {
	// written by Jhey Tompkins: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
	let inThrottle
	return function() {
		const args = arguments
		const context = this
		if (!inThrottle) {
			func.apply(context, args)
			inThrottle = true
			setTimeout(() => inThrottle = false, limit)
		}
	}
}

export default timing