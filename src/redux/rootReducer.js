import { FETCH_PATIENTS_SUCCESS, FETCH_PATIENTS_FAILED, UPDATE_PATIENT_FAILED, UPDATE_PATIENT_SUCCESS, DELETE_PATIENT_FAILED, DELETE_PATIENT, DELETE_PATIENT_SUCCESS, ADD_PATIENT, ADD_PATIENT_SUCCESS, ADD_PATIENT_FAILED, SHOW_LOADER, HIDE_LOADER, SET_ERROR } from './actionTypes'

export const initialState = {
	patients: [],
	error: '',
	loading: false
};

export const rootReducer = (state = initialState, action) => {
	// Action => type, payload
	switch (action.type) {
		case FETCH_PATIENTS_SUCCESS:
			return {
				...state,
				patients: action.payload,
			};
		case FETCH_PATIENTS_FAILED:
			return {
				...state,
				error: action.payload
			};
		case UPDATE_PATIENT_SUCCESS:
			return {
				...state,
				patients: state.patients.map(patient => patient.id === action.payload.id ? action.payload : patient)
			};
		case UPDATE_PATIENT_FAILED:
			return {
				...state,
				error: action.payload
			};
		case DELETE_PATIENT_SUCCESS:
			return {
				...state,
				patients: state.patients.filter(p => p.id !== action.payload)
			}
		case ADD_PATIENT_SUCCESS:
			return {
				...state,
				patient: state.patients.concat([action.payload])
			}
		case ADD_PATIENT_FAILED:
			return {
				...state,
				error: action.payload
			}
		case SHOW_LOADER:
			return { ...state, loading: true }
		case HIDE_LOADER:
			return { ...state, loading: false }
		case SET_ERROR:
			return { ...state, error: action.payload }
		default:
			return state;
	}
};

