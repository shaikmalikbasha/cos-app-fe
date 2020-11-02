import React, { Component } from 'react';
import Profile from '../Home/Profile';

class AdminHome extends Component {
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

export default AdminHome;
