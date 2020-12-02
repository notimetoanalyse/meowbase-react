import React, { createContext, useContext, useReducer } from 'react';
import reducer, { initialState } from '../reducer';

export const PatientsContext = createContext();

export const PatientsProvider = ({ initialState, reducer, children }) => {
  return (
    <PatientsContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatientsContext = () => useContext(PatientsContext);
