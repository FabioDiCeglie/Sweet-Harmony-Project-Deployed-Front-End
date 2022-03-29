//get all the chefs data(it is an [])
export const selectChefs = (reduxState) => reduxState.Chef.Chefs;

//get one specific chef data(it is an {})
export const selectChef = (reduxState) => reduxState.Chef.Chef;

//get all the types (it is an [])
export const selectTypes = (reduxState) => reduxState.Chef.Types;

//get all the reviews (it is an [])
export const selectReviews = (reduxState) => reduxState.Chef.Reviews;

//get all the chefs and recipes for the  community (it is an [])
export const selectInformationCommunityChefs = (reduxState) =>
  reduxState.Chef.Community;

//get all the recipes(it is an [])
export const selectRecipes = (reduxState) => reduxState.Chef.Recipes;
