import React, { Component } from 'react';
import ManagerPages from './ManagerPages';
import Header from '../header/Header';
import ManagerHome from './ManagerHome';

class ManagerLayout extends Component {
	render() {
		return (
			<div>
				{/* <Header props={ManagerPages} /> */}
				<ManagerHome />
			</div>
		);
	}
}

export default ManagerLayout;
