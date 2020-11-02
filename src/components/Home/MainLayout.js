import React, { Component } from 'react';
import Home from './Home';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { connect } from 'react-redux';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import extractedPages from '../pages/pages';
import { extractRolesFromToken } from '../../utils/token_utils';
import Profile from './Profile';

const mapStateToProps = state => {
	// console.log('State: ', state);
	return {
		user: state.account.user
	};
};

class MainLayout extends Component {
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
		console.log('this.props.state:  ', this);
		return (
			<div>
				<Header />
				<Home pages={this.state.pages} />
				{/* <Profile /> */}
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, null)(MainLayout);
