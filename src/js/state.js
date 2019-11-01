/**
 * Bolts 1.0.4 | MIT License
 *
 * Developed by Pocketsize
 * http://www.pocketsize.se/
 */

const state = {
	get,
	set,
	remove,
	toggle,
	getDOMState,
	setDOMState,

	_store: {
		global: [],
		local: [],
	},
}

/**
 * get
 *
 * @param {string} key
 * @param {Node} node - Defaults to the root element (global state) if not set
 *
 * @return {(string|number|boolean|undefined)} - Value of targeted state or undefined
 */

function get(key = null, node = false) {
	let result = {}

	if (!node) {
		state._store.global.forEach(function(globalState) {
			if (!key) {
				result[globalState.key] = globalState.value
			} else {
				if (globalState.key == key) {
					result = globalState.value
					return false
				}
			}
		})
	} else {
		state._store.local.forEach(function(nodeState) {
			if (nodeState.node == node) {
				if (!key) {
					result[nodeState.key] = nodeState.value
				} else {
					if (nodeState.key == key) {
						result = nodeState.value
						return false
					}
				}
			}
		})
	}

	if (
		   !!key
		&& typeof result === 'object'
		&& (
			   result !== null
			&& Object.keys(result).length === 0
		)
	) {
		result = undefined
	}

	return result
}


/**
 * set
 *
 * @param {string} key
 * @param {(string|number|boolean)} value
 * @param {Node} node - Defaults to the root element (global state) if not set
 * @param {boolean} setDOM - Attach the state as a data attribute in the DOM
 */

function set(key, value = true, node = false, setDOM = true) {
	if (
		   typeof value != 'number'
		&& typeof value != 'string'
		&& typeof value != 'boolean'
		&& value !== null
	) {
		throw new Error('state.set: Argument "value" must be a number, string, boolean or null')
	}

	if (!!node) {
		let i = state._store.local.length - 1

		while (i >= 0) {
			if (
				   state._store.local[i].key == key
				&& state._store.local[i].node == node
			) {
				state._store.local.splice(i, 1)
			}

			i -= 1
		}

		state._store.local.push({
			key: key,
			value: value,
			node: node
		})

		if (setDOM) {
			setDOMState(key, value, node)
		}
	} else {
		let i = state._store.global.length - 1

		while (i >= 0) {
			if (state._store.global[i].key == key) {
				state._store.global.splice(i, 1)
			}

			i -= 1
		}

		state._store.global.push({
			key: key,
			value: value
		})

		if (setDOM) {
			setDOMState(key, value)
		}
	}

	return
}


/**
 * remove
 *
 * @param {string} key
 * @param {Node} node - Defaults to the root element (global state) if not set
 */

function remove(key, node = false) {
	if (!!node) {
		let i = state._store.local.length - 1

		while (i >= 0) {
			if (
				   state._store.local[i].key == key
				&& state._store.local[i].node == node
			) {
				state._store.local.splice(i, 1)
			}

			i -= 1
		}

		setDOMState(key, false, node)
	} else {
		let i = state._store.global.length - 1

		while (i >= 0) {
			if (state._store.global[i].key == key) {
				state._store.global.splice(i, 1)
			}

			i -= 1
		}

		setDOMState(key, false)
	}

	return
}


/**
 * toggle
 *
 * @param {string} key
 * @param {(string|number|boolean|Array)} value
 * @param {Node} node - Defaults to the root element (global state) if not set
 */

function toggle(key, value = [true, false], node = false) {
	const typecheck = val => {
		if (
			typeof val == 'number'
			|| typeof val == 'string'
			|| typeof val == 'boolean'
		) {
			return true
		}

		return false
	}

	if (value && Array.isArray(value)) {
		value.forEach(val => {
			if (typecheck(val) === false) {
				throw new Error('state.toggle: Unsupported type in passed array. Type must be number, string or boolean')
			}
		})
	} else if (value && typecheck(value) === false) {
		throw new Error('state.toggle: Parameter "value" must be a number, string, boolean, or an array containing values of these types')
	}

	if (!value) {
		if (!get(key, node)) {
			set(key, true, node)
		} else {
			remove(key, node)
		}
	} else {
		if (Array.isArray(value)) {
			value = Array.from(new Set(value))

			let current = get(key, node)

			if (typeof current == 'undefined') {
				set(key, value[0], node)
			} else {
				let index = value.indexOf(current)

				if (value.length - 1 > index) {
					index++
				} else {
					index = 0
				}

				current = value[index]

				set(key, current, node)
			}
		} else {
			if (get(key, node) == value) {
				remove(key, node)
			} else {
				set(key, value, node)
			}
		}
	}
}


/**
 * setDOMState
 * Render the current state as data-attributes on elements in the DOM
 *
 * @param {Node} node - Defaults to the root element (global state) if not set
 */

function setDOMState(key, value = false, node = false) {
	if (!node) {
		node = document.documentElement
	}

	if (!(node instanceof HTMLElement)) {
		throw new Error('state.setDOMState: Invalid value for argument "node", expected HTMLElement')
	}
	
	if (!!value || value === 0) {
		if (value === true) {
			value = '';
		}

		node.setAttribute('data-bolts-state-' + key, value)
	} else {
		node.removeAttribute('data-bolts-state-' + key)
	}
}


/**
 * getDOMState
 *
 * Find states set in the DOM and load these into our state store
 */

function getDOMState() {
	function getNodeState(node, returnNode = true) {
		let attributes = node.attributes

		if (!attributes) {
			return false
		}

		attributes = Array.prototype.slice.call(attributes)
		let states = []

		attributes.forEach(function(attribute) {
			if (attribute.nodeName.indexOf('data-bolts-state') === 0) {
				const stateKey = attribute.nodeName.replace('data-bolts-state-', '')

				const value = !!attribute.nodeValue ? attribute.nodeValue : true

				const state = {
					key: stateKey,
					value: value
				}

				if (returnNode) {
					state.node = node
				}

				states.push(state)
			}
		})

		if (!states.length) {
			return false
		}

		return states
	}

	let globalNode = document.documentElement

	if (globalNode && globalNode.length) {
		let globalNodeState = getNodeState(globalNode[0], false)

		if (globalNodeState) {
			globalNodeState.forEach(function(globalState) {
				state.set(globalState.key, globalState.value, null, false)
			})
		}
	}

	let localNodes = document.documentElement.querySelectorAll('*')
	localNodes = Array.prototype.slice.call(localNodes)

	localNodes.forEach(function(node) {
		let nodeState = getNodeState(node)

		if (nodeState) {
			nodeState.forEach(function (localState) {
				state.set(localState.key, localState.value, node, false)
			})
		}
	})
}

export default state