import initialState from './state';

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ONCOLLAPSE':
      var newState = Object.assign({}, state, action.payload);
      return newState;
    default:
      return state;
  }
}

export default reducer;