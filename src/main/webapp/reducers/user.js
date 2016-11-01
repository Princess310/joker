import {
  REQUEST_USERS, RECEIVE_USERS
} from 'actions';

const user = (state = [], action) => {
	switch (action.type) {
		case REQUEST_USERS:
			return action
		case RECEIVE_USERS:
			return action
		default:
			return state
	}
}

export default user