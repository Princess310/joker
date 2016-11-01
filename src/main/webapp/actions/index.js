 import fetch from 'utils/fetch';

/**
 * User Actions
 * prince 2016/11/1
 */
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

const requestUsers = () => {
	return {
		type: REQUEST_USERS
	}
}

const receiveUsers = (users) => {
	return {
		type: RECEIVE_USERS,
		users: users
	}
}

export const fetchUsers = () => {
	return dispatch => {
		dispatch(requestUsers())
		return fetch.doGet('das-list-user')
			.then(response => dispatch(receiveUsers(response.result)))
	}
}


/**
 * Blog Actions
 * prince 2016/11/1
 */
export const REQUEST_BLOGS = 'REQUEST_BLOGS';
export const RECEIVE_BLOGS = 'RECEIVE_BLOGS';

const requestBlogs = () => {
	return {
		type: REQUEST_BLOGS
	}
}

const receiveBlogs = () => {
	return {
		type: RECEIVE_BLOGS,

	}
}

export const fetchBlogs = () => {
	return dispatch => {
		dispatch(requestBlogs())
		return fetch.doGet('das-list-blog')
			.then(response => dispatch(receiveBlogs(response.result)))
	}
}

export const addBlog = (blog) => {
		return {
			type: 'ADD_Blog',
			blog
		}
}