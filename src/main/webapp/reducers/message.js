import {
  SAVE_MESSAGE, REQUEST_MESSAGE
} from 'actions';

const message = (state = [], action) => {
	switch (action.type) {
		case SAVE_MESSAGE:
			return [
				...state,
				action.message
			];
		case REQUEST_MESSAGE:
			return action.message || [];
		default:
			return state;
	}
}

export default message;