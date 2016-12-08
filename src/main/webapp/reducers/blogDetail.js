import {
  REQUEST_BLOG_INFO
} from 'actions';

const blogDetail = (state = {}, action) => {
	switch (action.type) {
		case REQUEST_BLOG_INFO:
			return {
				blog: action.result.blog,
				tag: action.result.tag
			}
		default:
			return state
	}
}

export default blogDetail