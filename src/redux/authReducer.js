import { SIGN_IN, SIGN_OUT, RESET_PASSWORD, SHOW_AUTH_LOADER, HIDE_AUTH_LOADER, SET_AUTH_ERROR, UPDATE_USER_CREDS, SET_CURRENT_USER, SET_UPDATE_USER_CREDS_ERROR } from './actionTypes'

export const initState = {
	currentUser: null,
	error: '',
	loading: false
};

export const authReducer = (state = initState, action) => {
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
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			}
		case SHOW_AUTH_LOADER:
			return {
				...state,
				loading: true
			}
		case HIDE_AUTH_LOADER:
			return {
				...state,
				loading: false
			}
		case SET_UPDATE_USER_CREDS_ERROR:
			return {
				...state,
				error: action.payload
			}
		default: return state
	}
}