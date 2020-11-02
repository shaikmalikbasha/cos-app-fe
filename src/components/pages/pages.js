const managerPages = {
	Profile: '/profile',
	Employees: '/employees',
	Entries: '/entries'
};

const employeePages = {
	Profile: '/profile',
	Entries: '/entries'
};

const adminPages = {
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
