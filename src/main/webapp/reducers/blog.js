const blog = (state = [], action) => {
	switch (action.type) {
		case 'ADD_Blog':
			return [
				...state,
				action
			]
		default:
			return state
	}
}

export default blog