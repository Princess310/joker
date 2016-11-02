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

const receiveBlogs = (blogs) => {
	return {
		type: RECEIVE_BLOGS,
		blogs: blogs
	}
}

export const fetchBlogs = () => {
	return dispatch => {
		dispatch(requestBlogs())
		return fetch.doGet('getBlogList')
			.then(response => dispatch(receiveBlogs(response.result)))
	}
}


/**
 * Tag Actions
 * prince 2016/11/2
 */
export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';

const requestTags = () => {
	return {
		type: REQUEST_TAGS
	}
}

const receiveTags = (tags) => {
	return {
		type: RECEIVE_TAGS,
		tags: tags
	}
}

export const fetchTags = () => {
	return dispatch => {
		dispatch(requestTags())
		return fetch.doGet('getTagList')
			.then(response => dispatch(receiveTags(response.result)))
	}
}