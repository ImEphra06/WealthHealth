import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Table from "../../components/table/table";
import "../../style/style.css";
import { COLUMNS } from "../../data/COLUMNS";

function ListEmployees() {
	const employees = useSelector((state) => state.employeeList);
	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => employees, [employees]);

	if (!employees || employees.length === 0) {
		return (
			<main role="main" aria-label="List of Employees">
				<Container fluid className="h-100 bg-color-custom d-flex align-items-center justify-content-center">
					<p className="text-center">No employees found. Try adding mock data using the button in the table.</p>
				</Container>
			</main>
		);
	}

	return (
		<main role="main" aria-label="List of Employees">
			<Container fluid className="h-100 bg-color-custom">
				<h1 className="text-center py-4">Employee List</h1>
				<Table columns={columns} data={data} />
			</Container>
		</main>
	);
}

export default ListEmployees;
