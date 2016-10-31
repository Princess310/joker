import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {history, routes} from './routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import jokerApp from './reducers';

let store = createStore(jokerApp);

const root = (
	<Provider store={store} key="provider">
		<Router history={history} routes={routes} />
	</Provider>
)

ReactDOM.render(
	root, 
	document.getElementById('app')
);