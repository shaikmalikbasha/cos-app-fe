import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	isLoading,
	loginSuccess,
	loginFailure,
	redirectTo
} from '../../redux/actions/account';
import Loader from '../Loader/Loader';
import { reactLocalStorage as ls } from 'reactjs-localstorage';

const mapStateToProps = state => {
	// console.log('STATE: ', state);
	return {
		isAuthenticated: state.account.isAuthenticated,
		loader: state.account.loader,
		user: state.account.user
	};
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		isLoading: () => dispatch(isLoading()),
// 		loginSuccess: token => dispatch(loginSuccess(token))
// 	};
// };

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: ''
		};
	}

	handleEmailId = e => {
		this.setState({ email: e.target.value });
	};

	handlePassword = e => {
		this.setState({ password: e.target.value });
	};

	handleHideError = () => {
		this.setState({ error: '' });
	};

	handleSubmit = e => {
		e.preventDefault();

		let credentials = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.isLoading(true);

		fetch('http://localhost:5000/login', {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(json => {
				if (json.success === true) {
					let payload = {
						token: json.access_token,
						roles: json.roles
					};
					ls.set('access_token', json.access_token);
					// ls.set('roles', json.roles);
					this.props.loginSuccess(payload);
					this.props.isLoading(false);
				} else {
					this.props.loginFailure();
					this.props.isLoading(false);
					this.setState({ error: json.msg });
				}
			})
			.catch(err => {
				this.props.isLoading(false);
				this.setState({ error: err.message });
			});
	};

	render() {
		if (this.props.loader === true) return <Loader />;

		// console.log('props', this.props);

		if (this.props.isAuthenticated === true) {
			// let path = redirectTo(this.props.user.roles);
			// console.log('Path: ', path);
			return <Redirect to='/' />;
			// return <Redirect to={path.payload} />;
		}

		return (
			<div className='container' style={{ marginTop: 70 }}>
				<div className='row justify-row-content'>
					<div className='col-md-4 offset-md-4'>
						<div className='card'>
							<div align='center'>
								<img
									src={logo}
									alt='user'
									width='90'
									height='90'
									className='img-circle'
								/>
								<p className='text-danger' style={{ margin: 0, padding: 0 }}>
									{this.state.error}
								</p>
							</div>
							<div className='card-body'>
								<form onSubmit={this.handleSubmit}>
									<div className='form-group'>
										<label>
											<b>Email ID: </b>
										</label>
										<input
											type='text'
											className='form-control'
											placeholder='Enter your email id here.'
											value={this.state.email}
											onChange={this.handleEmailId}
											required
											onFocus={this.handleHideError}
										/>
									</div>
									<div className='form-group'>
										<label>
											<b>Password: </b>
										</label>
										<input
											type='password'
											className='form-control'
											placeholder='Enter your password here.'
											value={this.state.password}
											onChange={this.handlePassword}
											required
											onFocus={this.handleHideError}
										/>
									</div>
									<div align='center'>
										<input
											type='submit'
											className='btn btn-success btn-sm'
											value='Login'
										/>
										&nbsp; &nbsp; &nbsp; &nbsp;
										<button
											className='btn btn-danger btn-sm'
											onClick={() =>
												this.setState({ email: '', password: '' })
											}>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, {
	isLoading,
	loginSuccess,
	loginFailure,
	redirectTo
})(Login);
