import {
  REQUEST_TAGS, RECEIVE_TAGS
} from 'actions';

const tag = (state = [], action) => {
	switch (action.type) {
		case REQUEST_TAGS:
			return action
		case RECEIVE_TAGS:
			return action
		default:
			return state
	}
}

export default tag