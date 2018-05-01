const initialState = {
  barCode: '',
  name: ''
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETPRODUCT':
      // const {key, value} = action;
      // const nextState = {};
      // nextState[key] = value;
      // return { ...state, nextState};
      return { ...state, barCode: action.barCode}
    default:
      return state;
  }
}

export default ProductReducer;
