import { combineReducers } from 'redux';
import user from './user';
import blog from './blog';
import blogDetail from './blogDetail';
import tag from './tag';
import message from './message';

const jokerApp = combineReducers({
	user,
	blog,
	blogDetail,
	tag,
	message
})

export default jokerApp;