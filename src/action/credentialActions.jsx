import { UserService } from "../service";
import { FETCH_CREDENTIALS, LOGOUT } from "./type";
import { createAction } from ".";
import { setToken } from "../Utils/axiosClient";
import Swal from "sweetalert2";

export const fetchCredentials = (user) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_CREDENTIALS.REQUEST,
    });
    UserService.signIn(user)
      .then((res) => {
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setToken(res.data.accessToken);
        dispatch(createAction(FETCH_CREDENTIALS.SUCCESS, res.data));
      })
      .catch((err) => {
        dispatch({
          type: FETCH_CREDENTIALS.FAIL,
        });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data}`,
        })
      });
  };
};
export const logout = (history) => {
  return (dispatch) => {
    localStorage.removeItem("credentials");
    dispatch(createAction(LOGOUT.SUCCESS));
  };
};
