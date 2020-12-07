import { FETCH_PATIENTS, ADD_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, HIDE_LOADER, SHOW_LOADER, SET_PATIENTS_ERROR } from './actionTypes'

export const initState = {
	patients: [],
	error: '',
	loading: false
};

export const patientsReducer = (state = initState, action) => {
	switch (action.type) {
		case FETCH_PATIENTS:
			return {
				...state,
				patients: action.payload,
			};
		case UPDATE_PATIENT:
			return {
				...state,
				patients: state.patients.map(patient => patient.id === action.payload.id ? action.payload : patient)
			};
		case DELETE_PATIENT:
			return {
				...state,
				patients: state.patients.filter(p => p.id !== action.payload)
			}
		case ADD_PATIENT:
			return {
				...state,
				patient: [action.payload, ...state.patients]
			}
		case SHOW_LOADER:
			return { ...state, loading: true }
		case HIDE_LOADER:
			return { ...state, loading: false }
		case SET_PATIENTS_ERROR:
			return { ...state, error: action.payload }
		default:
			return state;
	}
};

