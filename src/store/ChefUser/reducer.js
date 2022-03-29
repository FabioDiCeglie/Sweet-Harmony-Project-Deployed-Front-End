import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("tokenChef"),
  email: null,
  messages: null,
};

export default function chefUserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("tokenChef", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("tokenChef");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };
    case "chef/updateBooking":
      const newState = { ...state };
      // const findBookingId = newState.bookings.find(
      //   (booking) => booking.id === action.payload.id
      // );
      // console.log("what is find booking id", findBookingId);
      const updateBooking = newState.bookings.map((booking) =>
        booking.id === action.payload.id
          ? { ...booking, isBooked: action.payload.isBooked }
          : { ...booking }
      );
      return {
        ...state,
        bookings: updateBooking,
      };
    case "chef/deleteBooking": {
      const newState = { ...state };
      const filterBookings = newState.bookings.filter(
        (booking) => booking.id !== action.payload
      );
      return {
        ...state,
        bookings: filterBookings,
      };
    }
    case "chef/updateChef": {
      return {
        ...state,
        chef: { ...action.payload, types: [...state.chef.types] },
      };
    }

    case "message/getMessages": {
      return {
        ...state,
        messages: action.payload,
      };
    }

    case "message/createOneMessage": {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }

    default:
      return state;
  }
}
