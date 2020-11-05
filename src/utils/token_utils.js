import jwt_decode from 'jwt-decode';
import { reactLocalStorage as ls } from 'reactjs-localstorage';

const parseJwt = token => {
	return jwt_decode(token);
};

const extractRolesFromToken = token => {
	let response = null;
	if (token !== undefined && token !== null) {
		const decodedToken = parseJwt(ls.get('access_token'));
		response = decodedToken.user_claims.roles;
	}
	return response;
};

const auth = () => {
	const token = ls.get('access_token');
	return token !== undefined ? true : false;
};

const manager_auth = () => {
	if (auth()) {
		const decodedToken = parseJwt(ls.get('access_token'));
		const roles = decodedToken.user_claims.roles;
		return roles.includes('MANAGER') || roles.includes('ADMIN') ? true : false;
	}
	return false;
};

const admin_auth = () => {
	let response = false;
	if (auth()) {
		const decodedToken = parseJwt(ls.get('access_token'));
		const roles = decodedToken.user_claims.roles;
		response = roles.includes('ADMIN') ? true : false;
	}
	return response;
};

export { auth, manager_auth, admin_auth, extractRolesFromToken };
