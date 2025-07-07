import { createSlice } from "@reduxjs/toolkit";

// Fonction pour stocker dans localStorage
function saveToLocalStorage(data) {
	localStorage.setItem("employeeList", JSON.stringify(data));
}

const employeeSlice = createSlice({
	name: "employee",
	initialState: { employeeList: [] },
	reducers: {
		addEmployee: (state, { payload }) => {
			state.employeeList.push(payload);
			saveToLocalStorage(state.employeeList);
		},
		uploadEmployees: (state, { payload }) => {
			state.employeeList = [];
			payload.employeeList.map((elt) => state.employeeList.push(elt));
			saveToLocalStorage(state.employeeList);
		},
	},
});

export const { addEmployee, uploadEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;