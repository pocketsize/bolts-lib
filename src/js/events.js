const matches = function(el, selector) {
    var p = Element.prototype

    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1
    }

    return f.call(el, selector)
}

const delegatedEventListeners = {}

const addDelegatedEventListener = function (type, selector, callback) {
    if (!delegatedEventListeners[type]) {
        const listeners = (delegatedEventListeners[type] = [])

        document.addEventListener(type, function (event) {
            for (
                let element = event.target;
                element && element.parentNode;
                element = element.parentNode
            ) {
                for (const { selector, callback } of listeners) {
                    if (matches(element, selector)) {
                        callback.call(element, event)
                    }
                }

                if (event.cancelBubble) {
                    break
                }
            }
        })
    }

    delegatedEventListeners[type].push({ selector, callback })
}

export { addDelegatedEventListener }