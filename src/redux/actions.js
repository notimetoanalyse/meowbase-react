import { FETCH_PATIENTS, SET_PATIENTS_ERROR, SHOW_LOADER, HIDE_LOADER, DELETE_PATIENT, ADD_PATIENT, UPDATE_PATIENT } from './actionTypes'
import { parsePatientFromSnapshot } from './utils'
import { db } from '../firebase';

export const showLoader = () => {
	return { type: SHOW_LOADER }
}

export const hideLoader = () => {
	return { type: HIDE_LOADER }
}

export const setPatientsError = (error) => {
	return { type: SET_PATIENTS_ERROR, payload: error }
}

export const updatePatient = (id, patient) => {
	return async dispatch => {
		try {
			dispatch(showLoader())
			await db.collection('patients').doc(id).update(patient)
			dispatch(hideLoader())
			dispatch({ type: UPDATE_PATIENT, payload: patient })
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
			dispatch(hideLoader())
			dispatch({ type: DELETE_PATIENT, payload: id })
		} catch (err) {
			dispatch(hideLoader())
			dispatch(setPatientsError(err.toString()))
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
