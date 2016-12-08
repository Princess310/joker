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
export const ADD_BLOG = 'ADD_BLOG';
export const DELETE_BLOGS = 'DELETE_BLOGS';
export const UPDATE_BLOG = 'UPDATE_BLOG';
export const REQUEST_BLOG_INFO = 'REQUEST_BLOG_INFO';

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

const receiveBlogInfo = (result) => {
	return {
		type: REQUEST_BLOG_INFO,
		result: result
	}
}

const addBlog = (blog) => {
	return {
		type: ADD_BLOG,
		blog: blog
	}
}

const removeBlog = (ids) => {
	return {
		type: DELETE_BLOGS,
		ids: ids
	}
}

const alterBlog = (blog) => {
	return {
		type: UPDATE_BLOG,
		blog: blog
	}
}

export const fetchBlogs = (keyword) => {
	if (typeof keyword === "undefined") { keyword = "" }
	return dispatch => {
		dispatch(requestBlogs())
		return fetch.doGet('getBlogList', {keyword: keyword})
			.then(response => dispatch(receiveBlogs(response.result)))
	}
}

export const fetchBlogInfo = (id) => {
	return dispatch => {
		return fetch.doGet('getBlogDetail', {id: id})
			.then(response => dispatch(receiveBlogInfo(response.result)))
	}
}

export const createBlog = (title, breif, tagId, picFileId, audioFileId, content) => {
	return dispatch => {
		return fetch.doPost('createBlog', {
			title: title,
			breif: breif,
			tagId: tagId,
			picFileId: picFileId,
			audioFileId: audioFileId,
			content: content
		}).then(response => dispatch(addBlog(response.result)));
	}
}

export const deleteBlogs = (ids) => {
	return dispatch => {
		return fetch.doDelete('deleteBlogs', {
			ids: ids.toString()
		}).then(response => dispatch(removeBlog(ids)));
	}
}

export const updateBlog = (id, title, breif, content, tagId, picFileId, audioFileId) => {
	return dispatch => {
		return fetch.doPut('updateBlog', {
			id: id,
			title: title,
			breif: breif,
			content: content,
			tagId: tagId,
			picFileId: picFileId,
			audioFileId: audioFileId
		}).then(response => dispatch(alterBlog(response.result)));
	}
}


/**
 * Tag Actions
 * prince 2016/11/2
 */
export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const ADD_TAG = 'ADD_TAG';
export const DELETE_TAGS = 'DELETE_TAGS';
export const UPDATE_TAG = 'UPDATE_TAG';

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

const addTag = (tag) => {
	return {
		type: ADD_TAG,
		tag: tag
	}
}

const removeTag = (ids) => {
	return {
		type: DELETE_TAGS,
		ids: ids
	}
}

const alterTag = (tag) => {
	return {
		type: UPDATE_TAG,
		tag: tag
	}
}

export const fetchTags = (keyword) => {
	if (typeof keyword === "undefined") { keyword = "" }
	return dispatch => {
		dispatch(requestTags())
		return fetch.doGet('getTagList', {keyword: keyword})
			.then(response => dispatch(receiveTags(response.result)))
	}
}

export const createTag = (name, color) => {
	return dispatch => {
		return fetch.doPost('createTag', {
			name: name,
			color: color
		}).then(response => dispatch(addTag(response.result)));
	}
}

export const deleteTags = (ids) => {
	return dispatch => {
		return fetch.doDelete('deleteTags', {
			ids: ids.toString()
		}).then(response => dispatch(removeTag(ids)));
	}
}

export const updateTag = (id, name, color) => {
	return dispatch => {
		return fetch.doPut('updateTag', {
			id: id,
			name: name,
			color: color
		}).then(response => dispatch(alterTag(response.result)));
	}
}

/**
 * File Actions
 * prince 2016/12/7
 */

export const uploadFile = (file) => {
	if (typeof file === "undefined") { return false }
	return dispatch => {
		return fetch.doUploadFile('uploadFile', {
			file: file
		});
	}
}