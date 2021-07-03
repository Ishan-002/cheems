import React, { createContext, useReducer } from 'react';

const initialState = {
  login: false,
  username: '',
  email: '',
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          login: true,
          username: action.payload.username,
          email: action.payload.email,
        };
      case 'RESET_APP':
        return {
          ...state,
          login: false,
          username: '',
          email: '',
        };
      default:
        return state;
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
