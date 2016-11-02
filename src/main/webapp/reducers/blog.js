import {
  REQUEST_BLOGS, RECEIVE_BLOGS
} from 'actions';

const blog = (state = [], action) => {
	switch (action.type) {
		case REQUEST_BLOGS:
			return action
		case RECEIVE_BLOGS:
			return action
		default:
			return state
	}
}

export default blog