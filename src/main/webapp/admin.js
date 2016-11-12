import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {history, routes} from './routes-admin';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import jokerApp from './reducers';

const loggerMiddleware = createLogger();

let store = createStore(
	jokerApp,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

const root = (
	<Provider store={store} key="provider">
		<Router history={history} routes={routes} />
	</Provider>
)

ReactDOM.render(
	root, 
	document.getElementById('app-admin')
);