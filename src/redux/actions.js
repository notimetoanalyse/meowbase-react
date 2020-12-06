import { FETCH_PATIENTS_SUCCESS, FETCH_PATIENTS, SET_ERROR, SHOW_LOADER, HIDE_LOADER, FETCH_PATIENTS_FAILED, UPDATE_PATIENT_FAILED, UPDATE_PATIENT_SUCCESS, DELETE_PATIENT, DELETE_PATIENT_SUCCESS, DELETE_PATIENT_FAILED, ADD_PATIENT_SUCCESS, ADD_PATIENT_FAILED, ADD_PATIENT } from './actionTypes'
import { parsePatientFromSnapshot } from './utils'
import { db } from '../firebase';

export const showLoader = () => {
	return { type: SHOW_LOADER }
}

export const hideLoader = () => {
	return { type: HIDE_LOADER }
}

export const setError = (error) => {
	return { type: SET_ERROR, payload: error }
}


export const updatePatient = (id, patient) => {
	return async dispatch => {
		try {
			dispatch(showLoader())
			await db.collection('patients').doc(id).update(patient)
			dispatch(hideLoader())
			dispatch(updatePatientSuccess(patient))
			dispatch(fetchPatients())

		} catch (err) {
			dispatch(hideLoader())
			dispatch(updatePatientFailed(err))
		}
	}
}

export const updatePatientSuccess = (patient) => {
	return { type: UPDATE_PATIENT_SUCCESS, payload: patient }
}

export const updatePatientFailed = (err) => {
	return { type: SET_ERROR, payload: err }
}

export const deletePatient = (id) => {
	return async dispatch => {
		try {
			dispatch(showLoader())
			await db.collection('patients').doc(id).update({
				status: 'invisible',
			});
			dispatch(hideLoader())
			dispatch(fetchPatients())
		} catch (err) {
			dispatch(hideLoader())
			dispatch(deletePatientFailed())
		}
	}
}

export const deletePatientSuccess = (patientId) => {
	return { type: deletePatient, payload: patientId }
}

export const deletePatientFailed = (err) => {
	return { type: DELETE_PATIENT_FAILED, payload: err }
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
			dispatch(fetchPatientsSuccess(filteredPatients))
			dispatch(hideLoader())
		} catch (err) {
			dispatch(hideLoader())
			dispatch(fetchPatientsFailed(err.toString()))
		}
	}
}

export const fetchPatientsSuccess = (patients) => {
	return { type: FETCH_PATIENTS_SUCCESS, payload: patients }
}

export const fetchPatientsFailed = (error) => {
	return { type: SET_ERROR, payload: error }
}

export const addPatient = (patient) => {
	return async dispatch => {
		try {
			dispatch(showLoader());
			await db.collection('patients').add(patient);
			dispatch(hideLoader())
			dispatch(addPatientSuccess(patient))
		} catch (err) {
			dispatch(hideLoader())
			dispatch(addPatientFailed(err))
		}
	}
}

export const addPatientFailed = (err) => {
	return { type: ADD_PATIENT_FAILED, payload: err }
}

export const addPatientSuccess = (patient) => {
	return { type: ADD_PATIENT_SUCCESS, payload: patient }
}