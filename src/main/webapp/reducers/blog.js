import {
  REQUEST_BLOGS, RECEIVE_BLOGS,
  ADD_BLOG
} from 'actions';

const blog = (state = [], action) => {
	switch (action.type) {
		case REQUEST_BLOGS:
			return action.blogs || []
		case RECEIVE_BLOGS:
			return action.blogs || []
		case ADD_BLOG:
			return [
				...state,
				action.blog
			]
		default:
			return state
	}
}

export default blog