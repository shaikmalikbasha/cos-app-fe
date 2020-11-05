import {
	IS_LOADING,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REDIRECT_TO,
	USER_INFO,
	PAGES,
	FETCH_EMPLOYEES,
	FETCH_ENTRIES,
	FETCH_ROLES,
	FETCH_EMP_ENTRIES
} from '../constants/constants';

let initialState = {
	loader: false,
	employees: [],
	entries: [],
	roles: [],
	empEntries: [],
	isAuthenticated: false,
	user: {
		token: ''
	},
	userInfo: '',
	redirectTo: ''
};

// const getRedirection = payload => {
// 	let roles = payload.roles;
// 	if (roles.includes('ADMIN')) {
// 		return '/admin';
// 	} else if (roles.includes('MANAGER')) {
// 		return '/manager';
// 	} else {
// 		return '/employee';
// 	}
// };

export const account = (state = initialState, action) => {
	switch (action.type) {
		case IS_LOADING:
			return {
				...state,
				loader: action.payload
			};
		case LOGIN_SUCCESS:
			return {
				isAuthenticated: true,
				user: action.payload
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loader: action.payload,
				isAuthenticated: false
			};
		case REDIRECT_TO:
			return {
				...state,
				redirectTo: action.payload
			};
		case USER_INFO:
			return {
				...state,
				userInfo: action.payload
			};
		case PAGES:
			return {
				...state,
				pages: action.payload
			};
		case FETCH_EMPLOYEES:
			return {
				...state,
				employees: action.payload
			};
		case FETCH_ENTRIES:
			return {
				...state,
				entries: action.payload
			};
		case FETCH_ROLES:
			return {
				...state,
				roles: action.payload
			};
		case FETCH_EMP_ENTRIES:
			return {
				...state,
				empEntries: action.payload
			};
		default:
			return state;
	}
};
