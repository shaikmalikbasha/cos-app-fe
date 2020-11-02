import { reactLocalStorage as ls } from 'reactjs-localstorage';
import { loginFailure } from '../actions/account';

export const authMiddleware = store => next => action => {
	const token = ls.get('access_token');
	if (token === undefined) {
		store.dispatch(loginFailure());
	} else {
		next(action);
	}
};
