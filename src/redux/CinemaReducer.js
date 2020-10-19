import {FETCH_CINEMA, FETCH_CINEMA_SYSTEM } from "../action/type";

let inistialState = {
  cinemaSystemArray: [],
  cinemaArray: [],
  loading: false,
  error: false,
};
const CinemaReducer = (state = inistialState, action) => {
  switch (action.type) {
    case FETCH_CINEMA_SYSTEM.REQUEST: {
      return { ...state, loading: true, error: false };
    }
    case FETCH_CINEMA_SYSTEM.SUCCESS: {
      return {
        ...state,cinemaSystemArray: action.payload, loading: false, error: false,
      };
    }
    case FETCH_CINEMA_SYSTEM.FAIL: {
      return { ...state, loading: false, error: true };
    }


    case FETCH_CINEMA.REQUEST: {
      return { ...state, loading: true, error: false };
    }
    case FETCH_CINEMA.SUCCESS: {
      return {
        ...state, cinemaArray: action.payload, loading: false, error: false,
      };
    }
    case FETCH_CINEMA.FAIL: {
      return { ...state, loading: false, error: true };
    }

    default:
      return state;
  }
};
export default CinemaReducer;
