import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import defaultParams from '../../config/config';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import { isLoading, getEntries } from '../../redux/actions/account';
import Loader from '../loader/Loader';
import AddEntry from './AddEntry';
import Entry from './Entry';

const mapStateToProps = state => {
	return {
		loader: state.account.loader,
		entries: state.account.entries
	};
};

class Entries extends Component {
	constructor(props) {
		super(props);
		let date = new Date();
		this.state = {
			year: date.getFullYear(),
			month: 8,
			day: '',
			msg: ''
		};
	}

	handleDate = e => {
		let date = e.target.value.split('-');
		let year = date[0];
		let month = date[1];
		let day = date[2];
		// let year = date.getFullYear();
		// let month = date.getMonth() + 1;
		// let day = date.getDay() + 1;
		this.setState({ year, month, day });
	};

	fetchEntries = ({ year, month, day }) => {
		this.props.isLoading(true);
		let URL = defaultParams.baseUrl;
		const token = ls.get('access_token');
		fetch(URL + `/employee/entries?year=${year}&month=${month}&day=${day}`, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => response.json())
			.then(res => {
				if (res.success === true) {
					this.props.getEntries(res.entries);
					this.setState({ msg: res.msg });
					this.props.isLoading(false);
				}
			})
			.catch(err => console.log('Error: ', err.message));
	};

	componentDidMount() {
		this.fetchEntries(this.state);
	}

	render() {
		const { entries } = this.props;
		let EntriesWrapper = null;
		if (entries !== undefined && entries.length > 0) {
			EntriesWrapper = <Entry entries={entries} />;
		} else {
			EntriesWrapper = (
				<div
					className='alert alert-danger'
					align='center'
					style={{ marginTop: 30 }}>
					<h3>Sorry! No records found</h3>
				</div>
			);
		}

		if (this.props.loader === true) return <Loader />;

		return (
			<div>
				<Header />
				<div className='container'>
					<div className='row justify-row-content'>
						<div className='col-sm-6 offset-md-3'>
							<div className='form-inline justify-content-center'>
								<button
									className='btn btn-info'
									data-toggle='modal'
									data-target='#addEntryModal'>
									Add Entry
								</button>
								<input
									type='date'
									className='form-control ml-sm-2 mr-sm-2'
									onChange={this.handleDate}
								/>
								<button
									className='btn btn-success'
									onClick={() => this.fetchEntries(this.state)}>
									Submit
								</button>
							</div>
						</div>
						<div className='alert'>{this.state.msg}</div>
						<div
							className='col-sm-6 offset-md-3'
							style={{ margin: '10 0 10 0' }}>
							{EntriesWrapper}
						</div>
					</div>
				</div>
				<AddEntry />
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, { isLoading, getEntries })(Entries);
