import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout, setMessage } from "../appState/actions";
import { selectUserToken } from "../../store/User/selectors";

const getChefs = (data) => ({
  type: "homepage/getChefs",
  payload: data,
});
//Get all the chefs from the database
export const fetchChefs = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/chefs`);
      console.log("what is the response", response.data);

      dispatch(getChefs(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getChef = (data) => ({
  type: "homepage/getChef",
  payload: data,
});
//Get all detail of one chef with parameter id from the database
export const fetchChef = (id) => {
  return async (dispatch, getState) => {
    try {
      //console.log("what is id", id);
      const response = await axios.get(`${apiUrl}/chefs/detailChef/${id}`);
      //console.log("what is the response", response.data);

      dispatch(getChef(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getTypes = (data) => ({
  type: "homepage/getTypes",
  payload: data,
});
//Get all the chefs from the database
export const fetchTypes = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/types`);
      //console.log("what is the response", response.data);

      dispatch(getTypes(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//Create new booking for that chef
export const createBookingChef = (
  dateString,
  startTimeString,
  endTimeString,
  name,
  email,
  phone,
  informations,
  id,
  userId
) => {
  return async (dispatch, getState) => {
    try {
      console.log("what is user id", id);
      const response = await axios.post(`${apiUrl}/detailChef/${id}/booking`, {
        dateString,
        startTimeString,
        endTimeString,
        name,
        email,
        phone,
        informations,
        userId,
      });
      console.log("what is the response", response.data);
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Congratulations,booking create!"
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(setMessage("danger", true, error.response.data.message));
    }
  };
};

const createReview = (data) => ({
  type: "chef/createReview",
  payload: data,
});
//Create new booking for that chef
export const createReviewChef = (id, name, content, rating) => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectUserToken(getState());

    // if we have no token, stop
    if (token === null) return;

    try {
      //console.log("what is id", id);
      const response = await axios.post(
        `${apiUrl}/chefs/detailChef/${id}/createReview`,
        {
          name,
          content,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("what is the response", response.data);
      dispatch(createReview(response.data));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Congratulations,review create!"
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(setMessage("danger", true, error.response.data.message));
    }
  };
};

const getReviews = (data) => ({
  type: "homepage/getReviews",
  payload: data,
});
//Get all the chefs from the database
export const fetchReviews = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/reviews`);
      console.log("what is the response", response.data);

      dispatch(getReviews(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const addLike = (data) => ({
  type: "menuPage/addLikes",
  payload: data,
});
//Get all the chefs from the database
export const addOneLike = (id, likes) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.patch(`${apiUrl}/chefs/recipe/${id}`, {
        likes,
      });
      console.log("what is the response", response.data);

      dispatch(addLike(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getChefsCommunity = (data) => ({
  type: "chefs/getChefsCommunity",
  payload: data,
});
//Get all the chefs from the database
export const fetchChefsCommunity = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/chefs/community`);
      //console.log("what is the response", response.data);

      dispatch(getChefsCommunity(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const getRecipes = (data) => ({
  type: "chefs/getRecipes",
  payload: data,
});
//Get all the chefs from the database
export const fetchRecipes = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/recipes`);
      console.log("what is the response", response.data);

      dispatch(getRecipes(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const addLikeRecipesPage = (data) => ({
  type: "recipesPage/addLikes",
  payload: data,
});
//Get all the chefs from the database
export const addOneLikeRecipesPage = (id, likes) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.patch(`${apiUrl}/chefs/recipe/${id}`, {
        likes,
      });
      console.log("what is the response", response.data);

      dispatch(addLikeRecipesPage(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
