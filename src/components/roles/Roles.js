import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { connect } from 'react-redux';
import defaultParams from '../../config/config';
import { getRoles, isLoading } from '../../redux/actions/account';
import Loader from '../loader/Loader';

const mapStateToProps = state => {
	return {
		loader: state.account.loader,
		roles: state.account.roles
	};
};

const RolesWrapper = ({ roles }) => {
	if (roles === undefined || roles.length === 0) return null;
	roles = roles.sort();
	return (
		<div className='col-md-4 offset-md-4 justify-content-center'>
			<table className='table table-bordered table-hovered'>
				<thead>
					<tr>
						<td>
							<b>Id</b>
						</td>
						<td>
							<b>Name</b>
						</td>
					</tr>
				</thead>
				<tbody>
					{roles.map(role => (
						<tr key={role.id}>
							<td>{role.id}</td>
							<td>{role.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

class Roles extends Component {
	getRolesList = () => {
		this.props.isLoading(true);
		let BASE_URL = defaultParams.baseUrl;
		fetch(BASE_URL + '/roles')
			.then(response => response.json())
			.then(res => {
				// console.log(res);
				this.props.getRoles(res.roles);
				this.props.isLoading(false);
			});
	};

	componentDidMount() {
		this.getRolesList();
	}

	render() {
		if (this.props.loader === true) return <Loader />;

		return (
			<div>
				<Header />
				<div className='container'>
					<div className='row justify-row-content'>
						<RolesWrapper roles={this.props.roles} />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
export default connect(mapStateToProps, { getRoles, isLoading })(Roles);
