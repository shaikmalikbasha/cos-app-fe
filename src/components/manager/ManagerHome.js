import React, { Component } from 'react';
import Profile from '../Home/Profile';

class ManagerHome extends Component {
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

export default ManagerHome;
