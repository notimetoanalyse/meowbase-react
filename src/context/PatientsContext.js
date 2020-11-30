import React, { createContext, useContext, useReducer } from 'react';

export const PatientsContext = createContext();

export const PatientsProvider = ({ initialState, reducer, children }) => (
  <PatientsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </PatientsContext.Provider>
);

export const usePatientsContext = () => useContext(PatientsContext);
