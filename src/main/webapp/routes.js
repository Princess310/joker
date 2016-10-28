import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import AppContainer from './views/AppContainer';
import Dashboard from './views/Dashboard';
import App from './views/App';
import Admin from './views/Admin';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard}/>
		<Route path="/app" component={AppContainer}>
			<Route path=":page" component={AppContainer}></Route>
		</Route>
		<Route path="/admin" component={Admin}></Route>
	</Route>
);

const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

export {routes, history};