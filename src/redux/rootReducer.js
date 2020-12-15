import { combineReducers } from 'redux'
import { patientsReducer } from './patientsReducer';
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
	patients: patientsReducer, auth: authReducer
});