import React from 'react';
import { CSVLink } from 'react-csv';
const Entry = ({ entries }) => {
	if (entries.length === 0 || entries === null) return null;
	return (
		<div>
			<div align='right'>
				{/* <button className='btn btn-sm btn-primary m-sm-2'>Export to CSV</button> */}
				<CSVLink data={entries} className='btn btn-sm btn-primary m-sm-2'>
					Export to CSV
				</CSVLink>
			</div>
			<table
				className='table table-bordered table-hovered'
				style={{ marginBottom: 50 }}>
				<thead>
					<tr className='bg-secondary'>
						<td>Id</td>
						<td>Name</td>
						<td>Date</td>
						<td>Hours</td>
					</tr>
				</thead>
				<tbody>
					{entries.map((entry, index) => {
						let bgColor =
							entry.hours.split(':')[0] >= 8 ? 'bg-success' : 'bg-danger';
						return (
							<tr key={index}>
								<td>{entry.id}</td>
								<td>{entry.name}</td>
								<td>{entry.date}</td>
								<td className={bgColor}>{entry.hours}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Entry;
