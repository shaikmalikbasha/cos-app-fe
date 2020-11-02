import React, { Component } from 'react';

class LifeCycle extends Component {
	constructor(props) {
		super(props);
		console.log('constructor');
		this.state = {
			counter: 0
		};
	}

	componentDidMount() {
		console.log('componentDidMount');
		this.setState({ name: 'Malik' });
	}

	handleChange = () => {
		const counter = this.state.counter;
		this.setState({ counter: counter + 1 });
	};

	render() {
		console.log('render', this.state);
		return (
			<div align='center'>
				<button onClick={this.handleChange}>Click Me</button>
				<div>Counter {this.state.counter}</div>
			</div>
		);
	}
}

export default LifeCycle;
