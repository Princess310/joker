import { combineReducers } from 'redux';
import user from './user';
import blog from './blog';
import tag from './tag';

const jokerApp = combineReducers({
	user,
	blog,
	tag
})

export default jokerApp;