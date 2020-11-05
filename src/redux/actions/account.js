import {
	LOGIN,
	LOGIN_SUCCESS,
	IS_LOADING,
	LOGIN_FAILURE,
	REDIRECT_TO,
	PAGES,
	FETCH_EMPLOYEES,
	FETCH_ENTRIES,
	FETCH_ROLES,
	FETCH_EMP_ENTRIES
} from '../constants/constants';
import extractedPages from '../../components/pages/pages';

export const isLoading = flag => {
	return {
		type: IS_LOADING,
		payload: flag
	};
};

export const login = () => {
	return {
		type: LOGIN,
		payload: null
	};
};

export const loginSuccess = token => {
	return {
		type: LOGIN_SUCCESS,
		payload: token
	};
};

export const loginFailure = () => {
	return {
		type: LOGIN_FAILURE,
		payload: null
	};
};

export const pages = roles => {
	return {
		type: PAGES,
		payload: extractedPages(roles)
	};
};

const getHomePageUrl = roles => {
	if (roles !== undefined) {
		if (roles.includes('ADMIN')) {
			return '/admin';
		} else if (roles.includes('MANAGER')) {
			return '/manager';
		} else {
			return '/employee';
		}
	}
	return '';
};

export const redirectTo = roles => {
	return {
		type: REDIRECT_TO,
		payload: getHomePageUrl(roles)
	};
};

export const getEmployees = employees => {
	return {
		type: FETCH_EMPLOYEES,
		payload: employees
	};
};

export const getEntries = entries => {
	return {
		type: FETCH_ENTRIES,
		payload: entries
	};
};

export const getRoles = roles => {
	return {
		type: FETCH_ROLES,
		payload: roles
	};
};

export const getEmployeesEntries = entries => {
	return {
		type: FETCH_EMP_ENTRIES,
		payload: entries
	};
};
