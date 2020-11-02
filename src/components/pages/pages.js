const employeePages = {
	Home: '/',
	Profile: '/profile',
	Entries: '/entries'
};

const managerPages = {
	Home: '/',
	Profile: '/profile',
	Employees: '/employees',
	Entries: '/entries'
};

const adminPages = {
	Home: '/',
	Profile: '/profile',
	Employees: '/employees',
	Entries: '/entries'
};

const extractedPages = roles => {
	if (roles.includes('ADMIN')) {
		return adminPages;
	} else if (roles.includes('MANAGER')) {
		return managerPages;
	} else {
		return employeePages;
	}
};

export default extractedPages;
