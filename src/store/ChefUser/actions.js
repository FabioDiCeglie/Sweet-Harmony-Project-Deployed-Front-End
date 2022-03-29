import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (
  fullName,
  email,
  password,
  phone,
  imageUrl,
  description,
  experience,
  location,
  priceForHour,
  cookingTypes
) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        fullName,
        email,
        password,
        phone,
        imageUrl,
        description,
        experience,
        location,
        priceForHour,
        cookingTypes,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      console.log("what ise response log in", response.data);
      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //console.log("what is response me", response.data);
      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

const updateBooking = (data) => {
  return {
    type: "chef/updateBooking",
    payload: data,
  };
};

export const updateBookingChef = (id) => {
  return async (dispatch, getState) => {
    try {
      // get token from the state
      const token = selectToken(getState());

      // if we have no token, stop
      if (token === null) return;
      // if we do have a token,
      // check wether it is still valid or if it is expired
      //console.log("what is id", id);
      const response = await axios.put(
        `${apiUrl}/auth/me/updateBooking/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //console.log("what is response me update booking", response.data);
      // token is still valid
      dispatch(updateBooking(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};
const deleteBooking = (data) => {
  return {
    type: "chef/deleteBooking",
    payload: data,
  };
};

export const deleteBookingChef = (id) => {
  return async (dispatch, getState) => {
    try {
      // get token from the state
      const token = selectToken(getState());

      // if we have no token, stop
      if (token === null) return;
      // if we do have a token,
      // check wether it is still valid or if it is expired
      //console.log("what is id", id);
      const response = await axios.delete(
        `${apiUrl}/auth/me/deleteBooking/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //console.log("what is response me update booking", response.data);
      // token is still valid
      dispatch(deleteBooking(id));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};
const updateChef = (data) => {
  return {
    type: "chef/updateChef",
    payload: data,
  };
};
//update information chef
export const updateChefInformation = (
  fullName,
  email,
  phone,
  imageUrl,
  description,
  experience,
  location
) => {
  return async (dispatch, getState) => {
    try {
      // get token from the state
      const token = selectToken(getState());

      // if we have no token, stop
      if (token === null) return;
      // if we do have a token,
      // check wether it is still valid or if it is expired
      //console.log("what is id", id);
      const response = await axios.put(
        `${apiUrl}/auth/me/updateChef`,
        {
          fullName,
          email,
          phone,
          imageUrl,
          description,
          experience,
          location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("what is response me update chef", response.data);
      dispatch(updateChef(response.data));
      dispatch(
        showMessageWithTimeout("success", false, "You update your information!")
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};

const createRecipe = (data) => ({
  type: "chef/createRecipe",
  payload: data,
});
//Create new recipes for the menu
export const createRecipeChef = (title, description, image) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    try {
      //console.log("what is id", id);
      const response = await axios.post(
        `${apiUrl}/auth/create/recipe`,
        {
          title,
          description,
          image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("what is the response", response.data);

      dispatch(createRecipe(response.data));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Congratulations,recipe create!"
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(setMessage("danger", true, error.response.data.message));
    }
  };
};

const updateRecipe = (data) => {
  return {
    type: "chef/updateRecipe",
    payload: data,
  };
};
//update information chef
export const updateChefRecipe = (id, title, content, image) => {
  return async (dispatch, getState) => {
    console.log("what is id", id);
    try {
      // get token from the state
      const token = selectToken(getState());

      // if we have no token, stop
      if (token === null) return;
      // if we do have a token,
      // check wether it is still valid or if it is expired
      //console.log("what is id", id);
      const response = await axios.patch(
        `${apiUrl}/auth/recipe/${id}/edit`,
        {
          title,
          content,
          image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("what is response me update chef", response.data);
      dispatch(updateRecipe(response.data));
      dispatch(
        showMessageWithTimeout("success", false, "You update your recipe!")
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};

const getMessages = (data) => ({
  type: "message/getMessages",
  payload: data,
});
//Get specific message from that booking from the database
export const fetchMessages = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/booking/${id}/messages`);
      console.log("what is the response", response.data);

      dispatch(getMessages(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const createOneMessage = (data) => ({
  type: "message/createOneMessage",
  payload: data,
});

//create message
export const createMessages = (id, message, chefId, userId) => {
  console.log("what is message", message, chefId);
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        `${apiUrl}/booking/${id}/messages/create`,
        {
          message,
          chefId,
          userId,
        }
      );
      console.log("what is the response", response.data);

      dispatch(createOneMessage(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
