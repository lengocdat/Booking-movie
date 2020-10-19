import FilmReducer  from "./FilmReducer";
import {combineReducers} from "redux";
import CinemaReducer from "./CinemaReducer";
import UserReducer from "./UserReducer";
import RoomTicketReducer from "./RoomTicketReducer"

const rootReducer = combineReducers({
    FilmReducer,//tao bien de hung du lieu tu sever tra ve quan li boi CourseReducer
    CinemaReducer,
    UserReducer,
    RoomTicketReducer
})
export default rootReducer;
