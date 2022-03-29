/* eslint-disable no-duplicate-case */
const initialState = {
  Events: null,
  Event: null,
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case "events/getEvents": {
      return {
        ...state,
        Events: action.payload,
      };
    }
    case "events/getEvent": {
      return {
        ...state,
        Event: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
