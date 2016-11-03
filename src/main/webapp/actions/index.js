 import fetch from 'utils/fetch';

/**
 * User Actions
 * prince 2016/11/1
 */
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USERS = 'DELETE_USERS';
export const UPDATE_USER = 'UPDATE_USER';

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

const addUser = (user) => {
	return {
		type: ADD_USER,
		user: user
	}
}

const removeUser = (ids) => {
	return {
		type: DELETE_USERS,
		ids: ids
	}
}

const alterUser = (user) => {
	return {
		type: UPDATE_USER,
		user: user
	}
}


export const fetchUsers = (keyword) => {
	if (typeof keyword === "undefined") { keyword = "" }
	return dispatch => {
		dispatch(requestUsers())
		return fetch.doGet('getUserList', {keyword: keyword})
			.then(response => dispatch(receiveUsers(response.result)))
	}
}

export const createUser = (username, pwd) => {
	return dispatch => {
		return fetch.doPost('createUser', {
			username: username,
			pwd: pwd
		}).then(response => dispatch(addUser(response.result)));
	}
}

export const deleteUsers = (ids) => {
	return dispatch => {
		return fetch.doDelete('deleteUsers', {
			ids: ids.toString()
		}).then(response => dispatch(removeUser(ids)));
	}
}

export const updateUser = (id, username, admin) => {
	return dispatch => {
		return fetch.doPut('updateUser', {
			id: id,
			username: username,
			admin: admin
		}).then(response => dispatch(alterUser(response.result)));
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