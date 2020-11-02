import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../authentication/Login';
import EmployeeLayout from '../employee/EmployeeLayout';
import ManagerLayout from '../manager/ManagerLayout';
import AdminLayout from '../admin/AdminLayout';
import EmployeeHome from '../employee/EmployeeHome';
import { connect } from 'react-redux';
import ManagerHome from '../manager/ManagerHome';
import AdminHome from '../admin/AdminHome';
import { manager_auth, auth, admin_auth } from '../../utils/token_utils';
import Logout from '../authentication/Logout';
import MainLayout from '../Home/MainLayout';
import Profile from '../Home/Profile';

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route render={props => <Component {...props} {...rest} />} />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			auth() ? (
				<MainLayout {...props}>
					<Component {...props} />
				</MainLayout>
			) : (
				<Redirect
					to={{
						pathname: '/login'
					}}
				/>
			)
		}
	/>
);

const ManagerRoute = ({ component: Component, ...rest }) => (
	<Route
		render={props =>
			manager_auth() ? (
				<MainLayout>
					<Component {...props} {...rest} />
				</MainLayout>
			) : (
				<Redirect
					to={{
						pathname: '/login'
					}}
				/>
			)
		}
	/>
);

const AdminRoute = ({ component: Component, ...rest }) => (
	<Route
		render={props =>
			admin_auth() ? (
				<MainLayout {...props}>
					<Component {...props} {...rest} />
				</MainLayout>
			) : (
				<Redirect
					to={{
						pathname: '/login'
					}}
				/>
			)
		}
	/>
);

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						{/* Public Routes */}
						<PublicRoute path='/login' component={Login} />
						<PublicRoute path='/logout' component={Logout} />

						{/* Private Routes */}
						<PrivateRoute exact path='/' component={Home} />
						<PrivateRoute exact path='/profile' component={Profile} />

						<PrivateRoute exact path='/employee' component={EmployeeHome} />
						<ManagerRoute exact path='/manager' component={ManagerHome} />
						<AdminRoute exact path='/admin' component={AdminHome} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
