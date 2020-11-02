import React, { Component } from 'react';
import { reactLocalStorage as ls } from 'reactjs-localstorage';

const ProfileDetails = ({ props }) => {
	return (
		<div className='card'>
			<div className='card-body'>
				<h4>
					<p>{props.name}</p>
				</h4>
				<p>
					<i>{props.email}</i>
				</p>
				<p>{props.phone}</p>
			</div>
		</div>
	);
};

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: null
		};
		this.getProfileDetails = this.getProfileDetails.bind(this);
	}

	getProfileDetails() {
		const URL = 'http://localhost:5000/employee/details';
		const token = ls.get('access_token');
		if (token !== undefined) {
			fetch(URL, {
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
				.then(res => res.json())
				.then(res => {
					// console.log(res);
					this.setState({ userInfo: res });
				})
				.catch(err => {
					console.warn('Error: ', err.message);
				});
		} else {
			window.location.replace('/login');
		}
	}

	componentDidMount() {
		this.getProfileDetails();
	}
	render() {
		console.log('this.state.state........===>', this.props);
		if (this.state.userInfo !== null) {
			return <ProfileDetails props={this.state.userInfo} />;
		} else {
			return null;
		}
	}
}

export default Profile;
