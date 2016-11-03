import {
  REQUEST_USERS, RECEIVE_USERS,
  ADD_USER, DELETE_USERS, UPDATE_USER
} from 'actions';

const user = (state = [], action) => {
	switch (action.type) {
		case REQUEST_USERS:
			return (action.users || [])
		case RECEIVE_USERS:
			return (action.users || [])
		case ADD_USER:
			return [
				...state,
				action.user
			]
		case DELETE_USERS:
			const users = state.filter(user => {
				return (action.ids.indexOf(user.id) < 0);
			});
			return users;
		case UPDATE_USER:
			state.map((user, index) => {
				if(user.id === action.user.id){
					state[index] = action.user;
				};
			});
			return state;
		default:
			return state
	}
}

export default user