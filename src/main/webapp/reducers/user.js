import {
  REQUEST_USERS, RECEIVE_USERS,
  ADD_USERS, DELETE_USERS
} from 'actions';

const user = (state = [], action) => {
	switch (action.type) {
		case REQUEST_USERS:
			return (action.users || [])
		case RECEIVE_USERS:
			return (action.users || [])
		case ADD_USERS:
			return [
				...state,
				action.user
			]
		case DELETE_USERS:
			const users = state.filter(user => {
				return (action.ids.indexOf(user.id) < 0);
			});
			return users;
		default:
			return state
	}
}

export default user