import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import AppContainer from './views/AppContainer';
import Dashboard from './views/Dashboard';
import App from './views/App';
import Login from './views/Login';
import Admin from './views/Admin';
import AdminContent from './views/Admin/AdminContent';
import User from 'containers/User';
import Blog from 'containers/Blog';
import Tag from 'containers/Tag';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard}/>
		<Route path="/app" component={AppContainer}>
			<Route path=":page" component={AppContainer}></Route>
		</Route>
		<Route path="/login" component={Login}></Route>
		<Route path="/admin" component={Admin}>
			<IndexRoute component={AdminContent}/>
			<Route path="user" component={User}></Route>
			<Route path="blog" component={Blog}></Route>
			<Route path="tag" component={Tag}></Route>
		</Route>
	</Route>
);

const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

export {routes, history};