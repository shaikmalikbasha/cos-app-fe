import React, { Component } from 'react';
import Profile from '../Home/Profile';

class EmployeeHome extends Component {
	render() {
		return (
			<div className='container'>
				<div className='profile-details'>
					<Profile />
				</div>
			</div>
		);
	}
}

export default EmployeeHome;
