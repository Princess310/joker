import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import App from './views/App';

const routes = (
	<Route path="/" component={App}>
	</Route>
);

const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

export {routes, history};