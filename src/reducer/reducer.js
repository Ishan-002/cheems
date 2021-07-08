const Reducer = (state, action) => {
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
};

export default Reducer;
