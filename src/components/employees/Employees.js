import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { connect } from 'react-redux';
import { getEmployees, isLoading } from '../../redux/actions/account';
import defaultParams from '../../config/config';
import Employee from './Employee';
import AddEmployee from './AddEmployee';
import Loader from '../loader/Loader';

const mapStateToProps = state => {
	return {
		loader: state.account.loader,
		employees: state.account.employees,
		roles: state.account.roles
	};
};

class Employees extends Component {
	getEmployeesList = () => {
		this.props.isLoading(true);
		let URL = defaultParams.baseUrl;
		fetch(URL + '/employees')
			.then(response => response.json())
			.then(res => {
				if (res.success === true) {
					this.props.getEmployees(res.employees);
					this.props.isLoading(false);
				} else {
					this.props.getEmployees([]);
				}
			})
			.catch(err => console.log(err));
	};

	componentDidMount() {
		this.getEmployeesList();
	}

	render() {
		if (this.props.loader === true) return <Loader />;
		return (
			<div className='employees-wrapper'>
				<Header />
				<AddEmployee
					fetchEmployees={this.getEmployeesList}
					roles={this.props.roles}
				/>
				<Employee employees={this.props.employees} />
				<Footer />
			</div>
		);
	}
}
export default connect(mapStateToProps, { getEmployees, isLoading })(Employees);
