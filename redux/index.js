import { createStore } from "redux";

const initialState = {
  user: null,
  isLoading: true,
  i: 0,
};

//déclaration du reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED": {
      return { ...state, user: action.user, isLoading: false };
    }
    case "NOT_LOGGED": {
      return { ...state, user: null, isLoading: false };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }

    default:
      return state;
  }
};

export const store = createStore(reducer); //creation du store
