/* eslint-disable no-duplicate-case */
const initialState = {
  Chefs: null,
  Chef: null,
  Types: null,
  Reviews: null,
  Community: null,
  Recipes: null,
};

export default function chefsReducer(state = initialState, action) {
  switch (action.type) {
    case "homepage/getChefs": {
      //   console.log("what is action payload", action.payload);
      return {
        ...state,
        Chefs: action.payload,
      };
    }
    case "homepage/getChef": {
      //   console.log("what is action payload", action.payload);
      return {
        ...state,
        Chef: action.payload,
      };
    }
    case "homepage/getTypes": {
      //   console.log("what is action payload", action.payload);
      return {
        ...state,
        Types: action.payload,
      };
    }

    case "homepage/getReviews": {
      return {
        ...state,
        Reviews: action.payload,
      };
    }

    case "chef/createReview": {
      return {
        ...state,
        Chef: {
          ...state.Chef,
          reviews: [...state.Chef.reviews, action.payload],
        },
      };
    }
    case "menuPage/addLikes": {
      const newState = { ...state };
      const addOneLike = newState.Chef.recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          return { ...recipe, likes: action.payload.likes };
        } else {
          return { ...recipe };
        }
      });
      return {
        ...state,
        Chef: { ...state.Chef, recipes: addOneLike },
      };
    }
    case "recipesPage/addLikes": {
      const newState = { ...state };
      const addOneLike = newState.Recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          return { ...recipe, likes: action.payload.likes };
        } else {
          return { ...recipe };
        }
      });
      return {
        ...state,
        Recipes: addOneLike,
      };
    }
    case "chefs/getChefsCommunity": {
      return { ...state, Community: action.payload };
    }

    case "chef/updateRecipe": {
      const newState = { ...state };
      const updateRecipe = newState.Chef.recipes.map((recipe) => {
        if (recipe.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return { ...recipe };
        }
      });
      console.log("what is update Recipe", updateRecipe);
      return {
        ...state,
        Chef: {
          ...state.Chef,
          recipes: updateRecipe,
        },
      };
    }

    case "chefs/getRecipes": {
      return {
        ...state,
        Recipes: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
