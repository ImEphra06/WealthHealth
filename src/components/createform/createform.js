import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Modal } from "@imephra06/pluginmodal";
import "@imephra06/pluginmodal/dist/modal/modal.css";
import { addEmployee } from "../../redux/employeeSlice";
import { checkForm } from "../../redux/employeeAction";
import STATES from "../../data/STATES.json";
import "./createform.css";

function CreateForm() {
	const dispatch = useDispatch();
	const CustomGreen = "#93AD18";
	const paramsModal = { bgColor: CustomGreen, Color: "white", link: "" };
	const dateToday = new Date();
	const yearToday = dateToday.getFullYear();

	// The string describing the result of the form submit
	let inputResult = "";

	// Hook states declaration & initialisation
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [startdate, setStartdate] = useState("");
	const [department, setDepartment] = useState("");
	const [validated, setValidated] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [messageModal, setMessageModal] = useState("");

	// The object values retrieved from the form
	const inputValue = {
		firstname,
		lastname,
		birthdate,
		street,
		city,
		state,
		startdate,
		zipcode,
		department,
	};

	// The object values resetted to clear the form
	function resetInputValues() {
		setFirstname("");
		setLastname("");
		setBirthdate("");
		setStreet("");
		setCity("");
		setState("");
		setStartdate("");
		setZipcode("");
		setDepartment("");
	}

	// The handleSubmit function called on clicking submit button
	function handleSubmit(e) {
		e.preventDefault();
		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.stopPropagation();
			setValidated(true);
			return;
		}

		setValidated(true);
		inputResult = checkForm(inputValue);
		setMessageModal(inputResult);
		if (inputResult === "Employee successfully created !") {
			dispatch(addEmployee(inputValue));
			resetInputValues();
			setValidated(false);
		}
		setOpenModal(true);
	}

	// The handleReset function called on clicking reset button
	function handleReset(e) {
		e.preventDefault();
		resetInputValues();
		setValidated(false);
	}

	// the Form and Modal HTML display
	return (
		<>
			<h1 className="p-3 text-center text-dark">Create Employee</h1>
			<Col md="auto" className="form-container m-3">
				<Form
					className="formular"
					noValidate
					validated={validated}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Container className="sub-form-container">
						<Row>
							<Form.Group as={Col} className="mb-3">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									required
									placeholder="Firstname"
									onChange={(e) => setFirstname(e.target.value)}
									value={firstname}
									pattern="^[( )a-zA-Z_-éèàêôâîûüù-]{2,50}$"
								/>
								<Form.Control.Feedback className="text-dark" type="invalid">
									must be 2 to 50 chars, letters only
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} className="mb-3">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									required
									placeholder="Lastname"
									onChange={(e) => setLastname(e.target.value)}
									value={lastname}
									pattern="^[( )a-zA-Z_éèàêôâîûüù-]{2,50}$"
								/>
								<Form.Control.Feedback className="text-dark" type="invalid">
									must be 2 to 50 chars, letters only
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col} className="mb-3">
								<Form.Label>Birth Date</Form.Label>
								<Form.Control
									required
									type="date"
									placeholder="Birth Date"
									onChange={(e) => setBirthdate(e.target.value)}
									value={birthdate}
									id="birthdatemin"
									name="birthdatemin"
									min={yearToday - 100 + "-01-01"}
									max={yearToday - 15 + "-12-31"}
								/>
								<Form.Control.Feedback className="text-dark" type="invalid">
									must be min 15 and max 100 years old
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
					</Container>
					<Container className="sub-form-container">
						<Row>
							<Form.Group as={Col} className="mb-3">
								<Form.Label>Street</Form.Label>
								<Form.Control
									required
									placeholder="Street"
									onChange={(e) => setStreet(e.target.value)}
									value={street}
									pattern="^[( )0-9a-zA-Z_,éèàêôâîûüù-]{2,50}$"
								/>
								<Form.Control.Feedback className="text-dark" type="invalid">
									must be 2 to 50 chars
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} className="mb-3">
								<Form.Label>City</Form.Label>
								<Form.Control
									required
									placeholder="City"
									onChange={(e) => setCity(e.target.value)}
									value={city}
									pattern="^[( )0-9a-zA-Z_-éèàêôâîûüù-]{2,50}$"
								/>
								<Form.Control.Feedback className="text-dark" type="invalid">
									must be 2 to 50 chars
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row>
							<Col>
								<Form.Label>State</Form.Label>
								<Form.Select
									data-testid={"select-state"}
									onChange={(e) => setState(e.target.value)}
									required
									value={state}>
									<option value="">Select State</option>
									{STATES.map((element) => {
										return (
											<option key={element.abbreviation} value={element.name}>
												{element.name}
											</option>
										);
									})}
								</Form.Select>
								<Form.Control.Feedback className="text-dark" type="invalid">
									Select State
								</Form.Control.Feedback>
							</Col>
							<Form.Group as={Col} className="mb-3">
								<Form.Label>Zip Code</Form.Label>
								<Form.Control
									required
									type="number"
									placeholder="Zip Code"
									onChange={(e) => setZipcode(e.target.value)}
									value={zipcode}
									pattern="^[0-9]{5}$"
								/>
								<Form.Control.Feedback className="text-dark" type="invalid">
									must be 5 numbers
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
					</Container>
					<Container className="sub-form-container">
						<Row>
							<Form.Group as={Col} className="mb-3">
								<Form.Label>Start Date</Form.Label>
								<Form.Control
									required
									type="date"
									placeholder="Start Date"
									onChange={(e) => setStartdate(e.target.value)}
									value={startdate}
									id="startdatemin"
									name="startdatemin"
									min={yearToday - 50 + "-01-01"}
									max={yearToday + "-12-31"}
								/>
								<Form.Control.Feedback className="text-dark" type="invalid">
									must be max 50 years behind
								</Form.Control.Feedback>
							</Form.Group>
							<Col>
								<Form.Label>Department</Form.Label>
								<Form.Select
									data-testid={"select-department"}
									onChange={(e) => setDepartment(e.target.value)}
									required
									value={department}>
									<option value="">Select Department</option>
									<option value="Engineering">Engineering</option>
									<option value="Human Resources">Human Resources</option>
									<option value="Legal">Legal</option>
									<option value="Marketing">Marketing</option>
									<option value="Sales">Sales</option>
								</Form.Select>
								<Form.Control.Feedback className="text-dark" type="invalid">
									Select Department
								</Form.Control.Feedback>
							</Col>
						</Row>
					</Container>
					<Container fluid className="d-flex justify-content-around">
						<Button type="submit" className="btn btn-success">
							Submit
						</Button>
						<Button type="reset" className="btn bg-transparent text-dark">
							Reset
						</Button>
					</Container>
				</Form>
			</Col>
			<Modal
				display={openModal}
				setDisplay={setOpenModal}
				message={messageModal}
				params={paramsModal}
			/>
		</>
	);
}

export default CreateForm;