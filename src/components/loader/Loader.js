import React from 'react';
import './Loader.css';
import icon from '../../assets/loader.gif';

export default function Loader() {
	return (
		<div className='loader-container'>
			<div className='loader'>
				<img src={icon} alt='Spinner' width='60' height='60' />
			</div>
		</div>
	);
}
