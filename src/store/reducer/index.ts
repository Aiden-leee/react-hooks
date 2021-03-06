import {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from "./actions/";
interface InitialType {
  loading: boolean;
  movies: any[];
  errorMessage: any;
}

export const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

export const reducers = (state: InitialType, action: any) => {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload,
        errorMessage: null,
      };
    case SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        movies: [],
      };
    default:
      return state;
  }
};
