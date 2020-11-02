import React, { Component } from 'react';
import Header from '../header/Header';
import AdminPages from './AdminPages';
import AdminHome from './AdminHome';

class AdminLayout extends Component {
	render() {
		// console.log('AdminLayout: ', this.props);
		return (
			<div>
				<Header props={AdminPages} />
				<AdminHome />
			</div>
		);
	}
}

export default AdminLayout;
