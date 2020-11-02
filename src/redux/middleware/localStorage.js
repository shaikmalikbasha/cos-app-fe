import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/constants';

import { reactLocalStorage as ls } from 'reactjs-localstorage';
import { loginFailure, isLoading } from '../actions/account';

export const localstorage = store => next => action => {
	const token = ls.get('access_token');
	if (action.type === LOGIN_SUCCESS) {
		if (token === undefined) {
			store.dispatch(loginFailure());
		}
	} else if (action.type === LOGIN_FAILURE) {
		store.dispatch(isLoading(true));
		ls.clear();
	}
	// if (token === undefined) {
	// 	store.dispatch(loginFailure());
	// }
	next(action);
};
