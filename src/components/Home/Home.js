import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import { loginSuccess, loginFailure } from '../../redux/actions/account';
import { Redirect, Link } from 'react-router-dom';
// import Profile from './Profile';
import { extractRolesFromToken } from '../../utils/token_utils';
// import { manager_auth } from '../../utils/token_utils';
// import { manager_auth } from '../../utils/token_utils';

const mapStateToProps = state => {
	return {
		isAuthenticated: state.account.isAuthenticated,
		loader: state.account.loader,
		user: state.account.user
	};
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: null
		};
	}

	componentDidMount() {
		let token = this.props.user.token || ls.get('access_token');
		let roles = this.props.user.roles || extractRolesFromToken(token);
		let payload = {
			token,
			roles
		};
		if (payload.token !== undefined) {
			this.props.loginSuccess(payload);
		}
	}

	render() {
		if (!this.props.isAuthenticated) {
			return <Redirect to='/login' />;
		}

		let PagesWrapper = null;
		if (this.props.pages !== null) {
			PagesWrapper = Object.entries(this.props.pages).map((page, index) => {
				return (
					<Link
						className='btn btn-info'
						style={{ margin: 2 }}
						key={index}
						to={page[1]}>
						{page[0]}
					</Link>
				);
			});
		}
		const customStyle = { marginTop: 10 };
		return (
			<div className='container'>
				<div className='row' style={customStyle}>
					<div className='col-sm'>{PagesWrapper}</div>
				</div>
				<div className='profile-wrapper' style={customStyle}>
					<h1 align='center'>Home Page</h1>
				</div>
				<div></div>
			</div>
		);
	}
}

export default connect(mapStateToProps, { loginSuccess, loginFailure })(Home);
