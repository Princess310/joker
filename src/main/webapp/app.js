import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {history, routes} from './routes';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import jokerApp from './reducers';

const NODE_ENV = process.env.NODE_ENV;
const loggerMiddleware = createLogger();

const middlewares = [
	thunkMiddleware,
];

// when in dev env, add the logger
if (NODE_ENV === 'development') {
	middlewares.push(loggerMiddleware);
}

let store = createStore(
	jokerApp,
	applyMiddleware(...middlewares)
);

const root = (
	<Provider store={store} key="provider">
		<Router history={history} routes={routes} />
	</Provider>
)

ReactDOM.render(
	root, 
	document.getElementById('app')
);