import {
  REQUEST_TAGS, RECEIVE_TAGS,
  ADD_TAG
} from 'actions';

const tag = (state = [], action) => {
	switch (action.type) {
		case REQUEST_TAGS:
			return action.tags || []
		case RECEIVE_TAGS:
			return action.tags || []
		case ADD_TAG:
			return [
				...state,
				action.tag
			]
		default:
			return state
	}
}

export default tag