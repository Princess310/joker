import {
  REQUEST_TAGS, RECEIVE_TAGS,
  ADD_TAG, DELETE_TAGS, UPDATE_TAG
} from 'actions';

const tag = (state = [], action) => {
	switch (action.type) {
		case REQUEST_TAGS:
			return action.tags || []
		case RECEIVE_TAGS:
			return action.tags || []
		case ADD_TAG:
			return [
				...state,
				action.tag
			]
		case DELETE_TAGS:
			const tags = state.filter(tag => {
				return (action.ids.indexOf(tag.id) < 0);
			});
			return tags;
		case UPDATE_TAG:
			state.map((tag, index) => {
				if(tag.id === action.tag.id){
					state[index] = action.tag;
				};
			});
			return state;
		default:
			return state
	}
}

export default tag