import {
	FETCH_PATIENTS, SET_PATIENTS_ERROR, SHOW_LOADER, HIDE_LOADER, DELETE_PATIENT, ADD_PATIENT, UPDATE_PATIENT, SIGN_IN, HIDE_LOADER_P,
	SIGN_OUT, SET_AUTH_ERROR, RESET_PASSWORD, UPDATE_USER_CREDS, SET_UPDATE_USER_CREDS_ERROR
} from './actionTypes'
import { parsePatientFromSnapshot } from './utils'
import { db } from '../firebase';

export const showLoader = () => {
	return { type: SHOW_LOADER }
}

export const hideLoader = () => {
	return { type: HIDE_LOADER_P }
}

export const setPatientsError = (error) => {
	return { type: SET_PATIENTS_ERROR, payload: error }
}

export const setAuthError = (err) => {
	return ({ type: SET_AUTH_ERROR, payload: err })
}

export const logIn = (user) => {
	return ({ type: SIGN_IN, payload: user })
}

export const logOut = () => {
	return ({ type: SIGN_OUT })
}

export const updateUserCreds = (user) => {
	return ({ type: UPDATE_USER_CREDS, payload: user })
}

// export const resetPassword = (email) => {
// 	return dispatch => {
// 		try {
// 			auth.sendPasswordResetEmail(email);
// 			dispatch({ type: RESET_PASSWORD })
// 		}
// 		catch (err) {
// 			dispatch({ SET_AUTH_ERROR, payload: err })
// 		}
// 	}
// }

// export const updateEmail = (email) => {
// 	return (dispatch, getState) => {
// 		try {
// 			getState().currentUser.updateEmail(email);
// 		}
// 		catch (err) {
// 			dispatch({ type: SET_AUTH_ERROR, payload: err })
// 		}
// 	}
// }

// export const updatePassword = (pass) => {
// 	return (dispatch, getState) => {
// 		try {
// 			getState().currentUser.updatePassword(pass);
// 		}
// 		catch (err) {
// 			dispatch({ type: SET_AUTH_ERROR, payload: err })
// 		}
// 	}
// }

export const updatePatient = (id, patient) => {
	return async dispatch => {
		try {
			dispatch(showLoader())
			await db.collection('patients').doc(id).update(patient)
			dispatch({ type: UPDATE_PATIENT, id, patient });
			dispatch(hideLoader())
		} catch (err) {
			dispatch(hideLoader())
			dispatch(setPatientsError(err))
		}
	}
}

export const deletePatient = (id) => {
	return async dispatch => {
		try {
			dispatch(showLoader())
			await db.collection('patients').doc(id).update({
				status: 'invisible',
			});
			dispatch({ type: DELETE_PATIENT, payload: id })
			dispatch(hideLoader())
		} catch (err) {
			dispatch(hideLoader())
			dispatch(setPatientsError(err))
		}
	}
}

export const fetchPatients = () => {
	return async dispatch => {
		try {
			dispatch(showLoader())
			const data = await db.collection('patients').get();
			const allPatients = data.docs.map(patientSnapshot =>
				parsePatientFromSnapshot(patientSnapshot)
			);
			const filteredPatients = allPatients.filter(patient => patient !== null);
			dispatch({ type: FETCH_PATIENTS, payload: filteredPatients });
			dispatch(hideLoader())
		} catch (err) {
			dispatch(hideLoader())
			dispatch(setPatientsError(err.toString()))
		}
	}
}

export const addPatient = (patient) => {
	return async dispatch => {
		try {
			dispatch(showLoader());
			await db.collection('patients').add(patient);
			dispatch(hideLoader())
			dispatch({ type: ADD_PATIENT, payload: patient })
		} catch (err) {
			dispatch(hideLoader())
			dispatch(setPatientsError(err.toString()))
		}
	}
}


db.collection('patients').onSnapshot(function () {
	fetchPatients();
});