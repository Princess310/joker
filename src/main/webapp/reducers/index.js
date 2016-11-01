import { combineReducers } from 'redux';
import user from './user';
import blog from './blog';

const jokerApp = combineReducers({
	user,
	blog
})

export default jokerApp;