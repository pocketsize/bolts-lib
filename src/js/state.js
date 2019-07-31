/**
 * Bolts 1.0.3 | MIT License
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
 * @param {Node} node - Defaults to HTML (global state) if not set
 *
 * @return {(string|number|boolean|undefined)} - Value of targeted state or undefined
 */

function get(key = null, node = false) {
	let tempState = {}

	if (!node) {
		state._store.global.forEach(function(globalState) {
			if (!key) {
				tempState[globalState.key] = globalState.value
			} else {
				if (globalState.key == key) {
					tempState = globalState.value
					return false
				}
			}
		})
	} else {
		state._store.local.forEach(function(nodeState) {
			if (nodeState.node == node) {
				if (!key) {
					tempState[nodeState.key] = nodeState.value
				} else {
					if (nodeState.key == key) {
						tempState = nodeState.value
						return false
					}
				}
			}
		})
	}

	if (
		   !!key
		&& typeof tempState === 'object'
		&& Object.keys(tempState).length === 0
	) {
		tempState = undefined
	}

	return tempState
}


/**
 * set
 *
 * @param {string} key
 * @param {(string|number|boolean)} value
 * @param {Node} node - Defaults to HTML (global state) if not set
 */

function set(key, value = true, node = false) {
	if (
		   typeof value != 'number'
		&& typeof value != 'string'
		&& typeof value != 'boolean'
	) {
		throw new Error('state.set() — Parameter "value" must be a number, string or boolean.')
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

		setDOMState(node)
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

		setDOMState()
	}

	return
}


/**
 * remove
 *
 * @param {string} key
 * @param {Node} node - Defaults to HTML (global state) if not set
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

		setDOMState(node)
	} else {
		let i = state._store.global.length - 1

		while (i >= 0) {
			if (state._store.global[i].key == key) {
				state._store.global.splice(i, 1)
			}

			i -= 1
		}

		setDOMState()
	}

	return
}


/**
 * toggle
 *
 * @param {string} key
 * @param {(string|number|boolean|Array)} value
 * @param {Node} node - Defaults to HTML (global state) if not set
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
				throw new Error('state.toggle() — Unsupported type in passed array. Type must be number, string or boolean.')
			}
		})
	} else if (value && typecheck(value) === false) {
		throw new Error('state.toggle() — Parameter "value" must be a number, string, boolean, or an array containing values of these types.')
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
 * @param {Node} node - Defaults to HTML (global state) if not set
 */

function setDOMState(node = false) {
	let states

	if (!!node) {
		states = []

		state._store.local.forEach(function(state) {
			if (state.node == node) {
				states.push(state)
			}
		})
	} else {
		states = state._store.global
		node = document.getElementsByTagName('html')[0]
	}

	let attributes = node.attributes

	if (!!attributes) {
		attributes = Array.prototype.slice.call(attributes)

		attributes.forEach(function(attribute) {
			if (attribute.nodeName.indexOf('data-bolts-state') === 0) {
				node.removeAttribute(attribute.nodeName)
			}
		})
	}

	states.forEach(function(state) {
		let attribute = state.key
		let value = state.value

		if (value === true) {
			value = ''
		}

		if (!!state.value || state.value === 0) {
			node.setAttribute('data-bolts-state-' + attribute, value)
		}
	})
}


/**
 * getDOMState
 *
 * Load a state._store data structure from all elements in the DOM
 */

function getDOMState() {
	let tempState = state._store

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

	let globalNode = document.getElementsByTagName('html')

	if (globalNode && globalNode.length) {
		let globalDOMState = getNodeState(globalNode[0], false)
		if (!globalDOMState) {
			globalDOMState = []
		}

		globalDOMState.forEach(function(globalState) {
			tempState.global = tempState.global.concat(globalState)
		})
	}

	let localNodes = document.querySelectorAll('*:not(html)')
	localNodes = Array.prototype.slice.call(localNodes)

	localNodes.forEach(function(node) {
		let nodeState = getNodeState(node)
		if (nodeState) {
			tempState.local = tempState.local.concat(nodeState)
		}
	})

	state._store = tempState
}

export default state