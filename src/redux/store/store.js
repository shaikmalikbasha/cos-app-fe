import { createStore, applyMiddleware } from 'redux';
import rootReducers from '../reducers/index';
import { localstorage } from '../middleware/localStorage';
// import { authMiddleware } from '../middleware/authMiddleware';

export const store = createStore(
	rootReducers,
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	{},
	applyMiddleware(localstorage)
);
