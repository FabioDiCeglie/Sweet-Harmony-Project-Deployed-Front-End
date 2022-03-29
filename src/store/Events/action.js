import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../ChefUser/selectors";
import { showMessageWithTimeout } from "../appState/actions";
import { selectUserToken } from "../../store/User/selectors";

const getEvents = (data) => ({
  type: "events/getEvents",
  payload: data,
});
//Get all the events from the database
export const fetchEvents = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/events`);
      console.log("what is the response", response.data);

      dispatch(getEvents(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getEvent = (data) => ({
  type: "events/getEvent",
  payload: data,
});
//Get event info from the database
export const fetchEvent = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/events/${id}`);
      //console.log("what is the response", response.data);

      dispatch(getEvent(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//create event
const createEvent = (data) => ({
  type: "events/createEvent",
  payload: data,
});

//Create event
export const createChefEvent = (
  dateString,
  startTimeString,
  endTimeString,
  name,
  location,
  image,
  maxNPeople,
  priceForPerson,
  information
) => {
  return async (dispatch, getState) => {
    try {
      // get token from the state
      const token = selectToken(getState());

      // if we have no token, stop
      if (token === null) return;
      const response = await axios.post(
        `${apiUrl}/events/create`,
        {
          dateString,
          startTimeString,
          endTimeString,
          name,
          location,
          image,
          maxNPeople,
          priceForPerson,
          information,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("what is the response", response.data);

      //dispatch(createEvent(response.data));
      dispatch(showMessageWithTimeout("success", true, "Event create!"));
    } catch (error) {
      console.log(error);
    }
  };
};

//Join event
export const joinEvent = (id) => {
  return async (dispatch, getState) => {
    try {
      // get token from the state
      const token = selectUserToken(getState());
      //console.log("what is token", token);

      // if we have no token, stop
      if (token === null) return;
      const response = await axios.post(
        `${apiUrl}/events/join/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //console.log("what is the response", response.data);

      //dispatch(join(response.data));
      dispatch(showMessageWithTimeout("success", false, "You join the event!"));
      dispatch(fetchEvents());
    } catch (error) {
      console.log(error);
    }
  };
};
