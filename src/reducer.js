export const initialState = {
  patients: [],
  error: '',
};

const reducer = (state, action) => {
  // Action => type, payload
  console.log(action);
  switch (action.type) {
    case 'SET_PATIENTS':
      return {
        ...state,
        patients: action.patients,
      };

    default:
      return state;
  }
};

export default reducer;
