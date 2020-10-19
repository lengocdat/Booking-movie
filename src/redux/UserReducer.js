import { FETCH_CREDENTIALS,LOGOUT } from "../action/type";

let inistialState = {
    credentials: "",
  };
  const UserReducer = (state = inistialState, action) => {
    switch (action.type) {
      case FETCH_CREDENTIALS.REQUEST: {
        return {...state, loading: true, error: false};
      }
      case FETCH_CREDENTIALS.SUCCESS: {
        return {...state, credentials: action.payload, loading: false, error: false};
      }
      case FETCH_CREDENTIALS.FAIL: {
        return {...state, loading: true, error: false};
      }

      case LOGOUT.REQUEST:{
        return {...state, loading: true, error: false};   
      }
      case LOGOUT.SUCCESS:{
        return {...state, credentials : "", loading: false, error: false};   
      }
      case LOGOUT.FAIL:{
        return {...state, credentials : "", loading: false, error: true};   
      }

      default:
        return state;
    }
  };
  export default UserReducer;