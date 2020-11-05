import React from 'react';

function Employee({ employees }) {
	return (
		<div className='container' style={{ marginBottom: 60 }}>
			<table className='table table-bordered'>
				<thead>
					<tr>
						<td>
							<b>Id</b>
						</td>
						<td>
							<b>Name</b>
						</td>
						<td>
							<b>Email</b>
						</td>
						<td>
							<b>Age</b>
						</td>
						<td>
							<b>Phone</b>
						</td>
						<td>
							<b>Joining DT</b>
						</td>
					</tr>
				</thead>
				<tbody>
					{employees !== undefined
						? employees.map((emp, index) => {
								return (
									<tr key={index}>
										<td>{emp.id}</td>
										<td>{emp.name}</td>
										<td>{emp.email}</td>
										<td>{emp.age}</td>
										<td>{emp.phone}</td>
										<td>{emp.hire_date}</td>
									</tr>
								);
						  })
						: null}
				</tbody>
			</table>
		</div>
	);
}

export default Employee;
