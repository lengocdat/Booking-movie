import { UserService } from "../service";
import { FETCH_CREDENTIALS, LOGOUT} from "./type";
import { createAction } from ".";

export const fetchCredentials = (user) => {
    return (dispatch) => {
      dispatch({
        type: FETCH_CREDENTIALS.REQUEST,
      });
      UserService.signIn(user)
        .then((res) => {
          localStorage.setItem('credentials', JSON.stringify(res.data));
          dispatch(createAction(FETCH_CREDENTIALS.SUCCESS, res.data));
        })
        .catch((err) => {
          dispatch({
            type: FETCH_CREDENTIALS.FAIL,
          });
          alert("Sai Mật Khẩu");
        });
  };
};
export const logout = (history) => {
  return (dispatch) => {
  localStorage.removeItem('credentials');
  dispatch(createAction(LOGOUT.SUCCESS));
};
};
