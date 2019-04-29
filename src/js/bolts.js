/**
 * Bolts 1.0.1 | MIT License
 *
 * Developed by Pocketsize
 * http://www.pocketsize.se/
 */

import detect from './detect'
import state from './state'

const bolts = {
    init,
}

function init(config = {}) {
    const defaults = {
        detectHoverThreshold: 100,
    }

    config = Object.assign({}, defaults, config)

    detect.hoverCapability(config.detectHoverThreshold)
    detect.imageOrientation()
    detect.resizeEvents()

    state.getDOMState()
}

export default bolts