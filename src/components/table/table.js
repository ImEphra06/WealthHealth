import React from "react";
import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { importMockEmployees } from "../../redux/employeeAction";
import { Modal } from "@imephra06/pluginmodal";
import { useTable, useGlobalFilter, useAsyncDebounce, usePagination, useSortBy } from "react-table";
import Row from "react-bootstrap/Row";
import "../../style/style.css";

// * Global Filtering Function
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = React.useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		// <--- Barre de recherche globale : --->
		<div className="searchBlock">
			<strong>Search</strong>
			<input
				className="form-control"
				value={value || ""}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} records...`}
			/>
		</div>
	);
}

// * Column hiding Function
const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

/**
 * Table displays the employee list with features: sort, filter, pagination, column toggle and mock upload.
 */
function Table({ columns, data }) {
	const dispatch = useDispatch();
	const [displayColumnsBar, setDisplayColumnsBar] = React.useState(false);
	const [modalOpen, setModalOpen] = React.useState(false);

	const toggleColumnsBar = (e) => {
		e.stopPropagation();
		if (e.target.attributes.class !== undefined) {
			if (e.target.attributes.class.nodeValue === "customBtn rndCorner") {
				setDisplayColumnsBar(!displayColumnsBar);
			} else if (e.target.attributes.class.nodeValue !== "checkbox") {
				setDisplayColumnsBar(false);
			}
		}
	};

	const launchMock = () => {
		dispatch(importMockEmployees());
		setModalOpen(true);
	};

	const {
		page,
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		allColumns,
		getToggleHideAllColumnsProps,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 10 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<Row className="main-row justify-content-center align-items-center" onClick={toggleColumnsBar}>
			<div className="d-inline-flex justify-content-center flex-wrap position-relative w-85 my-3 p-0">
				<h1 className="p-3 text-center text-dark">List Employees</h1>
				<div className="selectColumns">
					<div className={displayColumnsBar ? "columnsBar active" : "columnsBar"}>
						{allColumns.map((column) => (
							<div key={column.id}>
								<label>
									<input className="checkbox" type="checkbox" {...column.getToggleHiddenProps()} />{" "}
									{column.id}
								</label>
							</div>
						))}
						<div>
							<IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle All
						</div>
					</div>

					{/* <--- Bouton de colonnes ---> */}
					<button
						className="btn btn-outline-secondary"
						type="button"
						title="Hide column(s)"
						onClick={toggleColumnsBar}>
						{displayColumnsBar ? "X" : "Columns"}
					</button>
				</div>
			</div>

			<div className="d-inline-flex justify-content-between flex-wrap w-85 my-3 p-0">
				<div className="searchBlock">
					<strong>Show&ensp;</strong>
					{/* <--- Sélecteur de taille de page : ---> */}
					<select
						className="form-select form-select-sm w-auto"
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}>
						{[10, 25, 50, 100].map((size) => (
							<option key={size} value={size}>
								{size} entries
							</option>
						))}
					</select>
				</div>
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
			</div>

			<div className="tableContainer m-0 p-0 w-85 h-75">
				<table {...getTableProps()} className="table table-striped table-bordered">
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render("Header")}
										<span>{column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : "  "}</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="d-inline-flex justify-content-between align-items-center flex-wrap w-85 my-3 p-0">
				<div className="mock-button-wrapper">
					{/* <--- Bouton "Add Mock Employees" : ---> */}
					<button className="btn btn-success" onClick={launchMock}>
						Add Mock Employees
					</button>

					<Modal
						display={modalOpen}
						setDisplay={setModalOpen}
						message="Mock employees added successfully!"
						params={{ bgColor: "#93AD18", Color: "white", link: "" }}
					/>
				</div>

				<div className="d-flex justify-content-end align-items-center">
					<div className="btn-group me-2">
						<button className="btn btn-outline-primary btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
							{"<<"}
						</button>
						<button className="btn btn-outline-primary btn-sm" onClick={previousPage} disabled={!canPreviousPage}>
							{"<"}
						</button>
						<button className="btn btn-outline-primary btn-sm" onClick={nextPage} disabled={!canNextPage}>
							{">"}
						</button>
						<button className="btn btn-outline-primary btn-sm" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
							{">>"}
						</button>
					</div>
					<span className="me-2">
						Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
					</span>
				</div>
			</div>
		</Row >
	);
}

Table.propTypes = {
	columns: propTypes.array.isRequired,
	data: propTypes.array.isRequired,
};

export default Table;