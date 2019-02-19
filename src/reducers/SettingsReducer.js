const initialState = {
  allegroSortOptions: {
    sortType: "price", // endingTime , startingTime, price, priceDelivery, popularity, name, relevance
    sortOrder: "asc" // asc, desc
  },
  allegroFilterOptions: {
    offerType: "buyNow", // buyNow, auction
    description: true, // false, true
    condition: "new", // new, used
    city: null, // null, string with city name
    minPrice: null, // null, float with minimum item price
    maxPrice: null, // null, float with maximum item price
    skipPromoted: true // false, true
  }
};

const SettingsReducer = (state = initialState, action) => {
  const {type, key, value} = action;
  let nextState = {};

  switch (type) {
    case 'SET_OPTION':
      nextState[key] = value;
      return { ...state, ...nextState};
    case 'SET_ALLEGRO_FILTER_OPTION':
      nextState[key] = value;

      return {
        ...state,
        allegroFilterOptions: {
          ...state.allegroFilterOptions,
          ...nextState
        }
      };
    case 'SET_ALLEGRO_SORT_OPTION':
      nextState[key] = value;

      return {
        ...state,
        allegroSortOptions: {
          ...state.allegroSortOptions,
          ...nextState
        }
      };
    case 'RESET_TO_DEFAULTS':
      return initialState;
    default:
      return state;
  }
};

export default SettingsReducer;
