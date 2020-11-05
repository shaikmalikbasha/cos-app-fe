import React, { Component } from 'react';
import defaultParams from '../../config/config';
import { reactLocalStorage as ls } from 'reactjs-localstorage';

class AddEntry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'IN'
		};
	}

	handleChange = e => {
		this.setState({ type: e.target.value });
	};

	logEntry = () => {
		let URL = defaultParams.baseUrl;
		const token = ls.get('access_token');
		const { type } = this.state;
		let payload = {
			type
		};
		console.log('Type: ', payload);
		fetch(URL + '/entries', {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		})
			.then(r => r.json())
			.then(res => console.log(res))
			.catch(err => console.log(err.message));
	};

	render() {
		return (
			<div className='modal fade' id='addEntryModal'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Adding New Entry</h4>
							<button type='button' className='close' data-dismiss='modal'>
								&times;
							</button>
						</div>
						<div className='modal-body'>
							<div className='form-group'>
								<label>Please Select Type: </label>
								<select onChange={this.handleChange} className='form-control'>
									<option>IN</option>
									<option>OUT</option>
								</select>
							</div>
							<div align='center'>
								<button
									className='btn btn-success btn-sm'
									onClick={this.logEntry}>
									Log Entry
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddEntry;
