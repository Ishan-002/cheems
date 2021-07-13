const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        login: true,
        username: action.payload.username,
        email: action.payload.email,
        teams: action.payload.teams,
      };
    case 'RESET_APP':
      return {
        ...state,
        login: false,
        username: '',
        email: '',
        teams: [],
      };
    default:
      return state;
  }
};

export default Reducer;
