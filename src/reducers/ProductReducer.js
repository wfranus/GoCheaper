const initialState = {
  barCode: '',
  name: '',
  photoUrl: '',
  userPrice: 0.0,
  minPrice: 0.0
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETPRODUCT':
      const {key, value} = action;
      const nextState = {};
      nextState[key] = value;
      return { ...state, ...nextState};

      //return { ...state, action.barCode}
    case 'RESETPRODUCT':
      return initialState;
    default:
      return state;
  }
}

export default ProductReducer;
