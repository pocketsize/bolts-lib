/**
 * Bolts 1.0.5 | MIT License
 *
 * Developed by Pocketsize
 * http://www.pocketsize.se/
 */

import timing from './timing'

const misc = {
	autoHeight,
}

/**
 * autoHeight
 * 
 * @param {string} selector
 * 
 * Make height:auto animatable
 * Use together with @mixin autoHeight
 */

function autoHeight(selector) {
	this.elems = Array.from(document.querySelectorAll(selector))

	this.measure = (elem) => {
		elem.style.height = ''
		elem.style.height = `${elem.scrollHeight}px`
	}

	if (this.elems.length) {
		this.elems.forEach(elem => {
			this.measure(elem)

			window.addEventListener('resize', timing.debounce(() => {
				this.measure(elem)
			}, 500))
		})
	}
}

export default misc