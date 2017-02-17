import {
  REQUEST_BLOGS, RECEIVE_BLOGS,
  ADD_BLOG, DELETE_BLOGS, UPDATE_BLOG
} from 'actions';

let initState = {
	list: [],
	page: 0,
	totalItems: 0,
	totalPages: 0
}

const blog = (state = initState, action) => {
	switch (action.type) {
		case REQUEST_BLOGS:
			return {
				...state,
				...action.blogs
			};
		case RECEIVE_BLOGS:
			let list = state.list;

			if(action.blogs.page === 0){
				list = action.blogs.list
			}else {
				list = state.list.concat(action.blogs.list);
			}

			return {
				...state,
				...action.blogs,
				list: list
			};
		case ADD_BLOG:
			return {
				...state,
				list: [
					...state.list,
					action.blog
				]
			}
		case DELETE_BLOGS:
			const blogs = state.list.filter(blog => {
				return (action.ids.indexOf(blog.id) < 0);
			});
			return {
				...state,
				list: blogs
			};
		case UPDATE_BLOG:
			state.list.map((blog, index) => {
				if(blog.id === action.blog.id){
					state.list[index] = action.blog;
				};
			});
			return state;
		default:
			return state
	}
}

export default blog