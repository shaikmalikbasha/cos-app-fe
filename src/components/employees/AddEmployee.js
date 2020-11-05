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
			msg: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('Clicked');
		let BASE_URL = defaultParams.baseUrl;
		let { name, age, email, password, phone, hire_date } = this.state;
		hire_date = hire_date.split('-').join('/');
		const payload = { name, age, email, password, phone, hire_date };
		console.log(payload);
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
					console.log(res);
					// this.setState({ msg: res.msg });
					this.props.fetchEmployees();
				}
			})
			.catch(err => console.log(err));
	}

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
								<div className='form-group'>
									<label>Name</label>
									<input
										type='text'
										className='form-control'
										onChange={this.handleChange('name')}
									/>
								</div>
								<div className='form-group'>
									<label>Age</label>
									<input
										type='text'
										className='form-control'
										onChange={this.handleChange('age')}
									/>
								</div>
								<div className='form-group'>
									<label>Email</label>
									<input
										type='email'
										className='form-control'
										onChange={this.handleChange('email')}
									/>
								</div>
								<div className='form-group'>
									<label>Password</label>
									<input
										type='text'
										className='form-control'
										onChange={this.handleChange('password')}
									/>
								</div>
								<div className='form-group'>
									<label>Phone</label>
									<input
										type='text'
										className='form-control'
										onChange={this.handleChange('phone')}
									/>
								</div>
								<div className='form-group'>
									<label>Joining Date</label>
									<input
										type='date'
										className='form-control'
										onChange={this.handleChange('hire_date')}
									/>
								</div>
								<div align='center'>
									<div className='alert-success'>{this.state.msg}</div>
									<input
										type='submit'
										className='btn btn-sm btn-success'
										value='Submit'
										onClick={this.handleSubmit}
									/>
									&nbsp; &nbsp; &nbsp; &nbsp;
									<button className='btn btn-sm btn-danger'>Cancel</button>
								</div>
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
