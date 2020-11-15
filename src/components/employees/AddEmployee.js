import React, { Component } from 'react';
import defaultParams from '../../config/config';

class AddEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			age: '',
			email: '',
			password: '',
			phone: '',
			hire_date: '',
			card_number: '',
			role_id: 3,
			msg: '',
			flag: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let BASE_URL = defaultParams.baseUrl;
		let {
			name,
			age,
			email,
			password,
			phone,
			hire_date,
			card_number,
			role_id
		} = this.state;
		hire_date = hire_date.split('-').join('/');
		const payload = {
			name,
			age,
			email,
			password,
			phone,
			hire_date,
			card_number,
			role_id
		};
		fetch(BASE_URL + '/employees', {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(res => {
				if (res.success === true) {
					console.log('Response: ', res);
					this.setState({ msg: res.msg, flag: true });
					// this.props.fetchEmployees();
				}
			})
			.catch(err => console.log(err));
	}

	getEmployees = () => this.props.fetchEmployees();

	handleChange(key) {
		return function (e) {
			var state = {};
			state[key] = e.target.value;
			this.setState(state);
		}.bind(this);
	}

	render() {
		return (
			<div className='container' style={{ marginTop: 10, marginBottom: 10 }}>
				<div align='right'>
					<button
						className='btn btn-sm btn-success'
						data-toggle='modal'
						data-target='#addEmployeeModal'>
						Add Employee
					</button>
				</div>
				{this.state.flag && (
					<div
						className='alert alert-success alert-dismissible fade show'
						align='center'>
						<button
							type='button'
							onClick={this.getEmployees}
							className='close'
							data-dismiss='alert'>
							&times;
						</button>
						<strong>{this.state.msg}</strong>
					</div>
				)}
				<div className='modal fade' id='addEmployeeModal'>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h4 className='modal-title'>Adding New Employee</h4>
								<button type='button' className='close' data-dismiss='modal'>
									&times;
								</button>
							</div>

							<div className='modal-body'>
								<table
									className='table table-bordered'
									cellPadding={0}
									cellSpacing={0}>
									<tbody>
										<tr>
											<td align='right'>Full Name: </td>
											<td>
												<input
													type='text'
													className='form-control'
													onChange={this.handleChange('name')}
												/>
											</td>
										</tr>
										<tr>
											<td align='right'>Age: </td>
											<td>
												<input
													type='text'
													className='form-control'
													onChange={this.handleChange('age')}
												/>
											</td>
										</tr>
										<tr>
											<td align='right'>Email: </td>
											<td>
												<input
													type='email'
													className='form-control'
													onChange={this.handleChange('email')}
												/>
											</td>
										</tr>
										<tr>
											<td align='right'>Password: </td>
											<td>
												<input
													type='text'
													className='form-control'
													onChange={this.handleChange('password')}
												/>
											</td>
										</tr>
										<tr>
											<td align='right'>Joining Date: </td>
											<td>
												<input
													type='date'
													className='form-control'
													onChange={this.handleChange('hire_date')}
												/>
											</td>
										</tr>
										<tr>
											<td align='right'>Phone: </td>
											<td>
												<input
													type='text'
													className='form-control'
													onChange={this.handleChange('phone')}
												/>
											</td>
										</tr>
										<tr>
											<td align='right'>Card Number: </td>
											<td>
												<input
													type='text'
													className='form-control'
													onChange={this.handleChange('card_number')}
												/>
											</td>
										</tr>
										<tr>
											<td align='right'>Role: </td>
											<td>
												<select
													className='form-control'
													onChange={this.handleChange('role_id')}>
													<option value={3}>Employee</option>
													<option value={2}>Manager</option>
													<option value={1}>Admin</option>
												</select>
											</td>
										</tr>
										<tr>
											<td colSpan={2} align='center'>
												<input
													type='submit'
													className='btn btn-sm btn-success'
													value='Submit'
													onClick={this.handleSubmit}
													data-dismiss='modal'
												/>
												&nbsp; &nbsp; &nbsp; &nbsp;
												<button className='btn btn-sm btn-danger'>
													Cancel
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* <div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger'
									data-dismiss='modal'>
									Close
								</button>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddEmployee;
