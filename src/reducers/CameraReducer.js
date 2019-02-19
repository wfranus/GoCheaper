const initialState = { turnedOn: true };

const CameraReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TURNOFF':
      return { ...state, turnedOn: false};
    case 'TURNON':
      return { ...state, turnedOn: true};
    default:
      return state;
  }
};

export default CameraReducer;
