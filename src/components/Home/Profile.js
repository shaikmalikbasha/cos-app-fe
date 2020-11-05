import React, { Component } from 'react';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import defaultParams from '../../config/config';

const ProfileDetails = ({ props }) => {
	// console.log('Yes Profile Component is working...');
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
		const URL = defaultParams.baseUrl;
		const token = ls.get('access_token');
		if (token !== undefined) {
			fetch(URL + '/employee/details', {
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
		return (
			<div>
				<Header />
				{this.state.userInfo !== null ? (
					<ProfileDetails props={this.state.userInfo} />
				) : (
					''
				)}
				<Footer />
			</div>
		);
	}
}

export default Profile;
