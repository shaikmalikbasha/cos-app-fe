import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { connect } from 'react-redux';
import defaultParams from '../../config/config';
import { reactLocalStorage as ls } from 'reactjs-localstorage';
import { isLoading, getEmployeesEntries } from '../../redux/actions/account';
import Entry from './Entry';
import Loader from '../loader/Loader';

const mapStateToProps = state => {
	return {
		loader: state.account.loader,
		empEntries: state.account.empEntries
	};
};

class EmpEntries extends Component {
	constructor(props) {
		super(props);
		let date = new Date();
		this.state = {
			year: date.getFullYear(),
			month: 8,
			day: ''
		};
	}

	handleDate = e => {
		let date = e.target.value.split('-');
		let year = date[0];
		let month = date[1];
		let day = date[2];
		this.setState({ year, month, day });
	};

	fetchEntries = ({ year, month, day }) => {
		this.props.isLoading(true);
		let URL = defaultParams.baseUrl;
		const token = ls.get('access_token');
		fetch(URL + `/employees/entries?year=${year}&month=${month}&day=${day}`, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => response.json())
			.then(res => {
				this.props.getEmployeesEntries([].concat.apply([], res.entries));
				this.props.isLoading(false);
			})
			.catch(err => console.log('Error: ', err.message));
	};

	componentDidMount() {
		this.fetchEntries(this.state);
	}

	render() {
		const { empEntries } = this.props;
		let EntriesWrapper = null;
		console.log('EmpEntries: ', empEntries);
		if (empEntries !== undefined && empEntries.length > 0) {
			// var entries = [].concat.apply([], empEntries);
			EntriesWrapper = <Entry entries={empEntries} />;
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
			<div className='container'>
				<Header />
				<div className='row justify-row-content'>
					<div className='col-sm-6 offset-md-3' style={{ margin: '10 0 10 0' }}>
						{EntriesWrapper}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default connect(mapStateToProps, { isLoading, getEmployeesEntries })(
	EmpEntries
);
