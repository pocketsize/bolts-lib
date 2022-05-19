/**
 * Bolts 1.0.6 | MIT License
 *
 * Developed by Pocketsize
 * https://pocketsize.se
 */

const timing = {
	debounce,
	throttle,
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
