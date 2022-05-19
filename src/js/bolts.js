/**
 * Bolts 1.0.6 | MIT License
 *
 * Developed by Pocketsize
 * https://pocketsize.se
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

    state.getDOMState()

    detect.hoverCapability(config.detectHoverThreshold)
    detect.imageOrientation()
    detect.resizeEvents()
}

export default bolts
