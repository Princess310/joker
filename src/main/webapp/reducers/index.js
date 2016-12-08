import { combineReducers } from 'redux';
import user from './user';
import blog from './blog';
import blogDetail from './blogDetail';
import tag from './tag';

const jokerApp = combineReducers({
	user,
	blog,
	blogDetail,
	tag
})

export default jokerApp;