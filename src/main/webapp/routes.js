import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import AppContainer from './views/AppContainer';
import Dashboard from './views/Dashboard';
import BlogList from 'containers/BlogList';
import Chat from 'views/Chat';
import Gallery from 'views/Gallery';
import Game from 'views/Game';
import Media from 'views/Media';
import BlogDetail from 'containers/BlogDetail';
import App from './views/App';

const routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard}/>
		<Route path="/app" component={AppContainer}>
			<Route path="blog" component={BlogList}></Route>
			<Route path="blogDetail" component={BlogDetail}></Route>
			<Route path="chat" component={Chat}></Route>
			<Route path="gallery" component={Gallery}></Route>
			<Route path="game" component={Game}></Route>
			<Route path="media" component={Media}></Route>
		</Route>
	</Route>
);

const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

export {routes, history};