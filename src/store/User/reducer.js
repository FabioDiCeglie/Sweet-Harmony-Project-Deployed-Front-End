import { LOG_OUT, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("tokenUser"),
  user: null,
  messages: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_OUT:
      localStorage.removeItem("tokenUser");
      return { ...initialState, token: null };

    case "user/loginSuccess":
      localStorage.setItem("tokenUser", action.payload.token);
      return { ...state, ...action.payload };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

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
