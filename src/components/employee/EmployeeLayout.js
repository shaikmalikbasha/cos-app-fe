import React, { Component } from 'react';
import Header from '../header/Header';
import EmployeePages from './EmployeePages';
import EmployeeHome from './EmployeeHome';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	// console.log('State: ', state);
	return state;
};

class EmployeeLayout extends Component {
	render() {
		// console.log('EmployeeLayout: ', this.props);
		return (
			<div>
				<Header props={EmployeePages} />
				<EmployeeHome />
			</div>
		);
	}
}

export default connect(mapStateToProps, null)(EmployeeLayout);
