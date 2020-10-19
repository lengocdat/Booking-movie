import { FETCH_ROOM_TICKET } from "../action/type";

let inistialState = {
    roomTicket: "",
  };
const RoomTicketReducer = (state = inistialState, action) => {
  switch (action.type) {
    case FETCH_ROOM_TICKET.SUCCESS: {
      return {...state, roomTicket: action.payload, loading: false, error: false };
    }
    default:
      return state;
  }
};
export default RoomTicketReducer;