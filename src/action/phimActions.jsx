import { FETCH_CINEMA_SYSTEM, FETCH_CINEMA, FETCH_FILM_DETAIL, FETCH_FILM_OF_CINEMA, FETCH_FILM_OF_PAGE, } from "./type";
import { createAction } from ".";
import { FilmService, CinemaService } from "../service";

export const fetchFilmOfPage = (curentpage,sophantu) => {
  return (dispatch) => {
    dispatch({
      type:FETCH_FILM_OF_PAGE.REQUEST
    });
    FilmService.getFilmOfPage(curentpage,sophantu)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_OF_PAGE.SUCCESS, res.data));
      })
      .catch((err) => {
        dispatch({
          type:FETCH_FILM_OF_PAGE.FAIL
        });
      });
  };
};

export const fetchFilmDetail = (maphim) => {
  return (dispatch) => {
    dispatch({
      type:FETCH_FILM_DETAIL.REQUEST
    });
    FilmService.getFilmDetail(maphim)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_DETAIL.SUCCESS, res.data));
      })
      .catch((err) => {
        dispatch({
          type:FETCH_FILM_DETAIL.FAIL
        });
      });
  };
};

export const fetchFilmOfCinema = (marap) => {
  return (dispatch) => {
    dispatch({
      type:FETCH_FILM_OF_CINEMA.REQUEST
    });
    FilmService.getFilmOfCinema(marap)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_OF_CINEMA.SUCCESS, res.data));
      })
      .catch((err) => {
        dispatch({
          type:FETCH_FILM_OF_CINEMA.FAIL
        });
      });
  };
};

export const fetchCinemaSystem = () => {
  return (dispatch) => {
    dispatch({
      type:FETCH_CINEMA_SYSTEM.REQUEST
    });
    CinemaService.getCinemaSystem()
      .then((res) => {
        dispatch(createAction(FETCH_CINEMA_SYSTEM.SUCCESS, res.data));
      })
      .catch((err) => {
        dispatch({
          type:FETCH_CINEMA_SYSTEM.FAIL
        });
      });
  };
};

export const fetchCinema = (marap) => {
  return (dispatch) => {
    dispatch({
      type:FETCH_CINEMA.REQUEST
    });
    CinemaService.getCinema(marap)
    .then((res) => {
      dispatch(createAction(FETCH_CINEMA.SUCCESS, res.data))
    })
    .catch((err) => {
      dispatch({
        type:FETCH_CINEMA.FAIL
      });
    })
  }
}



