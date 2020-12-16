import {
	SET_PATIENTS, SET_PATIENTS_ERROR, DELETE_PATIENT, ADD_PATIENT, UPDATE_PATIENT, SIGN_IN, SHOW_PATIENTS_LOADER, HIDE_PATIENTS_LOADER,
	SIGN_OUT, SET_AUTH_ERROR, SIGN_UP, RESET_PASSWORD, UPDATE_USER_CREDS, SET_UPDATE_USER_CREDS_ERROR,SHOW_AUTH_LOADER, HIDE_AUTH_LOADER, SET_CURRENT_USER} from './actionTypes';
import { parsePatientFromSnapshot } from './utils'
import {auth, db} from '../firebase';

export const showPatientsLoader = () => {
	return ({type: SHOW_PATIENTS_LOADER})
}

export const hidePatientsLoader = () => {
	return ({type: HIDE_PATIENTS_LOADER})
}

export const setPatientsError = (error) => {
	return { type: SET_PATIENTS_ERROR, payload: error }
}

export const setAuthError = (err) => {
	return ({ type: SET_AUTH_ERROR, payload: err.toString() })
}

export const showAuthLoader = () => {
	return ({type: SHOW_AUTH_LOADER})
}

export const hideAuthLoader = () => {
	return ({type: HIDE_AUTH_LOADER})
}

export const setCurrentUser = (user) => {
	return ({ type: SET_CURRENT_USER, payload: user })
}

export const updateUserCreds = (user) => {
	return ({ type: UPDATE_USER_CREDS, payload: user })
}

export const setPatients = (patients) => {
	return ({type: SET_PATIENTS, payload: patients})
}

export const signOut = () => {
	return async dispatch => {
		try {
			dispatch(showAuthLoader())
			dispatch(setAuthError(''))
			await auth.signOut();
			dispatch(setCurrentUser(null))
			dispatch(hideAuthLoader())
		} catch (err) {
			dispatch(hideAuthLoader())
			dispatch(setAuthError(err.toString()))
			console.log(err)
		}
	}
}

export const signIn = (email, pass) => {
	return async dispatch => {
		try {
			dispatch(showAuthLoader())
			dispatch(setAuthError(''))
			const res = await auth.signInWithEmailAndPassword(email, pass);
			dispatch(setCurrentUser(res.user))
			console.log(res.user.email)
			dispatch(hideAuthLoader())
			setTimeout(() => {
				dispatch(signOut())
			}, 3600000)
		} catch (e) {
			dispatch(hideAuthLoader())
			dispatch(setAuthError(e))
		}
	}
}

export const signUp = (email, pass) => {
	return async dispatch => {
		try {
			dispatch(showAuthLoader())
			await auth.createUserWithEmailAndPassword(email, pass)
			dispatch(hideAuthLoader())
		} catch(err) {
			dispatch(hideAuthLoader())
			setAuthError(err.toString())
		}
	}
}

export const resetPassword = (email) => {
	return async dispatch => {
		try {
			dispatch(showAuthLoader())
			await auth.sendPasswordResetEmail(email);
			dispatch(hideAuthLoader())
		}
		catch (err) {
			dispatch(hideAuthLoader())
			dispatch(setAuthError(err.toString()))
		}
	}
}

export const updateEmail = (email) => {
	return async (dispatch, getState) => {
		try {
			const {currentUser} = getState().auth
			console.log(currentUser)
			await currentUser.updateEmail(email);
		} catch(e) {
			dispatch(setAuthError(e.toString()))
		}
	}
}

export const updatePassword = (pass) => {
	return async (dispatch, getState) => {
		try {
			const {currentUser} = getState().auth
			console.log(currentUser)
			await currentUser.updatePassword(pass);
		} catch(e) {
			dispatch(setAuthError(e.toString()))
		}
	}
}

export const updatePatient = (id, patient) => {
	return async dispatch => {
		try {
			dispatch(showPatientsLoader())
			await db.collection('patients').doc(id).update(patient)
			dispatch({ type: UPDATE_PATIENT, id, patient });
			dispatch(hidePatientsLoader())
		} catch (err) {
			dispatch(hidePatientsLoader())
			dispatch(setPatientsError(err.toString()))
		}
	}
}

export const deletePatient = (id) => {
	return async dispatch => {
		try {
			dispatch(showPatientsLoader())
			await db.collection('patients').doc(id).update({
				status: 'invisible',
			});
			dispatch({ type: DELETE_PATIENT, payload: id })
			dispatch(hidePatientsLoader())
		} catch (err) {
			dispatch(hidePatientsLoader())
			dispatch(setPatientsError(err.toString()))
		}
	}
}

export const fetchPatients = () => {
	return async dispatch => {
		try {
			dispatch(showPatientsLoader())
			dispatch(setPatientsError(''))
			const data = await db.collection('patients').get();
			const allPatients = data.docs.map(patientSnapshot =>
				parsePatientFromSnapshot(patientSnapshot)
			);
			const filteredPatients = allPatients.filter(patient => patient !== null);
			dispatch({ type: SET_PATIENTS, payload: filteredPatients });
			console.log(filteredPatients)
			dispatch(hidePatientsLoader())
		} catch (err) {
			dispatch(hidePatientsLoader())
			dispatch(setPatientsError(err.toString()))
		}
	}
}

export const addPatient = (patient) => {
	return async dispatch => {
		try {
			dispatch(showPatientsLoader());
			dispatch(showPatientsLoader());
			await db.collection('patients').add(patient);
			dispatch(hidePatientsLoader())
			dispatch({ type: ADD_PATIENT, payload: patient })
		} catch (err) {
			dispatch(hidePatientsLoader())
			dispatch(setPatientsError(err.toString()))
		}
	}
}