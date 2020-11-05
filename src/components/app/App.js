import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../authentication/Login';
import { manager_auth, auth, admin_auth } from '../../utils/token_utils';
import Logout from '../authentication/Logout';
import Profile from '../Home/Profile';
import Employees from '../employees/Employees';
import Entries from '../entries/Entries';
import Roles from '../roles/Roles';
import EmpEntries from '../entries/EmpEntries';

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route render={props => <Component {...props} {...rest} />} />
);

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				auth() ? (
					<Component {...props} />
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
};

const ManagerRoute = ({ component: Component, ...rest }) => (
	<Route
		render={props =>
			manager_auth() ? (
				<Component {...props} {...rest} />
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
		{...rest}
		render={props =>
			admin_auth() ? (
				<Component {...props} {...rest} />
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
						<PrivateRoute exact path='/entries' component={Entries} />

						<ManagerRoute exact path='/employees' component={Employees} />
						<ManagerRoute exact path='/emp-entries' component={EmpEntries} />
						{/* <PrivateRoute exact path='/employee' component={EmployeeHome} /> */}
						<AdminRoute exact path='/roles' component={Roles} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
