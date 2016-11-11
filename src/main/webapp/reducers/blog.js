import {
  REQUEST_BLOGS, RECEIVE_BLOGS,
  ADD_BLOG, DELETE_BLOGS, UPDATE_BLOG
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
		case DELETE_BLOGS:
			const blogs = state.filter(blog => {
				return (action.ids.indexOf(blog.id) < 0);
			});
			return blogs;
		case UPDATE_BLOG:
			state.map((blog, index) => {
				if(blog.id === action.blog.id){
					state[index] = action.blog;
				};
			});
			return state;
		default:
			return state
	}
}

export default blog