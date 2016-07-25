import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {getStoredState, persistStore, autoRehydrate} from 'redux-persist'
import createLogger from 'redux-logger'
import * as reducers from 'reducers'
import App from 'components/App'
import Slide from 'components/Slide'
//import {whyDidYouUpdate} from 'why-did-you-update'

if(process.env.NODE_ENV !== 'production') {
	//whyDidYouUpdate(React)
} else {
	console = console || {};
	console.log = console.group = function(){};
}
//
const reducer = combineReducers({
	...reducers,
  routing: routerReducer
})

const persistConfig = {
	skipRestore: false,
	blacklist:[]
}
getStoredState(persistConfig,(err,initialState) => {
	const store = createStore(
		reducer,
		initialState,
		applyMiddleware(thunkMiddleware, createLogger())
	)
	persistStore(store,persistConfig)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').slide
			store.replaceReducer(nextRootReducer)
		})
	}

	const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false })
	const history = syncHistoryWithStore(hashHistory, store)

	ReactDOM.render(
		<Provider store={store}>
			{ /* Tell the Router to use our enhanced history */ }
			<Router history={history}>
				<Route path='/' component={App}>
					<Route path=':index' component={Slide}/>
				</Route>
			</Router>
		</Provider>,
		document.getElementById('app')
	)
})
