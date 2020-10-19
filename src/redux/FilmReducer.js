import {FETCH_FILM_DETAIL, FETCH_FILM_OF_CINEMA, FETCH_FILM_OF_PAGE} from "../action/type";

let inistialState = {
  filmArray: {},
  filmDetailArray: [],
  filmOfCinemaArray: [],
};
const FilmReducer = (state = inistialState, action) => {
  switch (action.type) {
    case FETCH_FILM_OF_PAGE.REQUEST: {
      return { ...state, loading: true, error: false };
    }
    case FETCH_FILM_OF_PAGE.SUCCESS: {
      return { ...state, filmArray: action.payload, loading: false, error: false, };
    }
    case FETCH_FILM_OF_PAGE.FAIL: {
      return { ...state, loading: false, error: true, };
    }

    case FETCH_FILM_DETAIL.REQUEST: {
      return { ...state, loading: true, error: false };
    }
    case FETCH_FILM_DETAIL.SUCCESS: {
      return { 
        ...state,filmDetailArray: action.payload, loading: false, error: false
      };
    }
    case FETCH_FILM_DETAIL.FAIL: {
      return { ...state, loading: false, error: true, };
    }

    case FETCH_FILM_OF_CINEMA.REQUEST: {
      return { ...state, loading: true, error: false };
    }
    case FETCH_FILM_OF_CINEMA.SUCCESS: {
      state.filmOfCinemaArray = action.payload;
      return { ...state };
    }
    case FETCH_FILM_OF_CINEMA.FAIL: {
      return { ...state, loading: false, error: true, };
    }

    default:
      return state;
  }
};
export default FilmReducer;
