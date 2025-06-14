import MOCKDATA from "../data/MOCKDATA";
import { uploadEmployees } from "./employeeSlice";

// Vérifie les dates d'un formulaire
export function checkForm(data) {
	const dateToday = new Date();
	const yearToday = dateToday.getFullYear();
	const yearBirthDate = data.birthdate.slice(0, 4);
	const yearStartDate = data.startdate.slice(0, 4);
	let message = "";

	if (!(yearToday - yearBirthDate > 14)) {
		message = "Birth date must be at least 15 years behind";
	} else if (!(yearStartDate - yearBirthDate > 14)) {
		message = "Start date must be at least 15 years after birthDate";
	} else {
		message = "Employee successfully created !";
	}

	return message;
}

// Ajoute les employés depuis MOCKDATA
export function importMockEmployees() {
	return (dispatch) => {
		dispatch(uploadEmployees({ employeeList: MOCKDATA }));
	};
}
