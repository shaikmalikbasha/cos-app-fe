import React from 'react';
import { connect } from 'react-redux';
import { loginFailure } from '../../redux/actions/account';

function Header(props) {
	// console.log('props  => ', props);
	return (
		<div className='container' style={{ marginTop: 10 }}>
			<div align='right'>
				<button
					className='btn btn-sm btn-danger'
					onClick={() => props.loginFailure()}>
					Logout
				</button>
			</div>
		</div>
	);
}

export default connect(null, { loginFailure })(Header);
