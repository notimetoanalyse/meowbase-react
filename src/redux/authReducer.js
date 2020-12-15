import { SIGN_IN, SIGN_OUT, RESET_PASSWORD, SHOW_LOADER, HIDE_LOADER, SET_AUTH_ERROR, UPDATE_USER_CREDS, SET_UPDATE_USER_CREDS_ERROR } from './actionTypes'

export const initState = {
	currentUser: null,
	error: '',
	loading: false
};

export const authReducer = (state = initState, action) => {
	console.log(action)
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				currentUser: action.payload
			}
		case SIGN_OUT:
			return {
				...state,
				currentUser: null
			}
		case RESET_PASSWORD:
			return {
				...state
			}
		case SHOW_LOADER:
			return {
				...state,
				loading: true,
				error: ''
			}
		case HIDE_LOADER:
			return {
				...state,
				loading: false,
			}
		case SET_AUTH_ERROR:
			return {
				...state,
				error: action.payload
			}
		case UPDATE_USER_CREDS:
			return {
				...state,
				currentUser: action.payload
			}
		case SET_UPDATE_USER_CREDS_ERROR:
			return {
				...state,
				error: action.payload
			}
		default: return state
	}
}