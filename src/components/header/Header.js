import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginFailure } from '../../redux/actions/account';
import extractedPages from '../pages/pages';
import { extractRolesFromToken } from '../../utils/token_utils';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import { Link } from 'react-router-dom';
import defaultParams from '../../config/config';

const mapStateToProps = state => {
	// console.log('State: ', state);
	return {
		user: state.account.user
	};
};
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pages: null
		};
	}
	componentDidMount() {
		// console.log(this.props);
		let token = this.props.user.token || ls.get('access_token');
		const pages = extractedPages(extractRolesFromToken(token));
		// console.log('Pages: ', pages);
		this.setState({ pages });
	}

	render() {
		// console.log('props', this.state);
		return (
			<div style={{ marginBottom: 60 }}>
				<nav className='navbar navbar-expand-md bg-dark navbar-dark fixed-top'>
					<Link className='navbar-brand' to='/'>
						{defaultParams.appName}
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#collapsibleNavbar'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div
						className='collapse navbar-collapse justify-content-right'
						id='collapsibleNavbar'>
						<ul className='navbar-nav'>
							{this.state.pages !== null
								? Object.entries(this.state.pages).map((page, index) => (
										<li key={index} className='nav-item'>
											<Link className='nav-link' to={page[1]}>
												{page[0]}
											</Link>
										</li>
								  ))
								: null}
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/logout'
									onClick={() => this.props.loginFailure()}>
									Logout
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default connect(mapStateToProps, { loginFailure })(Header);
