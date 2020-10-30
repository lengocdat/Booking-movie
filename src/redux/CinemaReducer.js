import {FETCH_CINEMA, FETCH_CINEMA_SYSTEM } from "../action/type";

let inistialState = {
  cinemaSystemArray: [],
  cinemaSystemLoading: false,
  cinemaSystemError: false,
  cinemaArray: [],
  cinemaLoading: false,
  cinemaError: false,
};
const CinemaReducer = (state = inistialState, action) => {
  switch (action.type) {
    case FETCH_CINEMA_SYSTEM.REQUEST: {
      return { ...state, cinemaSystemLoading: true, cinemaSystemError: false };
    }
    case FETCH_CINEMA_SYSTEM.SUCCESS: {
      return {
        ...state,cinemaSystemArray: action.payload, cinemaSystemLoading: false, cinemaSystemError: false,
      };
    }
    case FETCH_CINEMA_SYSTEM.FAIL: {
      return { ...state, cinemaSystemLoading: false, cinemaSystemError: true };
    }


    case FETCH_CINEMA.REQUEST: {
      return { ...state, cinemaLoading: true, cinemaError: false };
    }
    case FETCH_CINEMA.SUCCESS: {
      return {
        ...state, cinemaArray: action.payload, cinemaLoading: false, cinemaError: false,
      };
    }
    case FETCH_CINEMA.FAIL: {
      return { ...state, cinemaLoading: false, cinemaError: true };
    }

    default:
      return state;
  }
};
export default CinemaReducer;
