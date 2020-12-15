import { SET_PATIENTS, ADD_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, SHOW_PATIENTS_LOADER, HIDE_PATIENTS_LOADER,SET_PATIENTS_ERROR} from './actionTypes'

export const initState = {
	patients: [],
	error: '',
};

export const patientsReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_PATIENTS:
			return {
				...state,
				patients: action.payload,
			};
		case UPDATE_PATIENT:
			return {
				...state,
				patients: state.patients.map(patient => patient.id == action.id ? { ...patient, ...action.patient } : patient)
			}
		case DELETE_PATIENT:
			return {
				...state,
				patients: state.patients.filter(patient => patient.id !== action.payload)
			}
		case ADD_PATIENT:
			return {
				...state,
				patient: [action.payload, ...state.patients]
			}
		case SET_PATIENTS_ERROR:
			return { ...state, error: action.payload }
		case SHOW_PATIENTS_LOADER:
			return {...state, loading: true}
		case HIDE_PATIENTS_LOADER:
			return {...state, loading: false}
		default:
			return state;
	}
};

