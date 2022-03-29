import { combineReducers } from "redux";
import appState from "./appState/reducer";
import chefUserReducer from "./ChefUser/reducer";
import chefsReducer from "./Chefs/reducer";
import userReducer from "./User/reducer";
import eventsReducer from "./Events/reducer";

export default combineReducers({
  appState,
  chefUser: chefUserReducer,
  Chef: chefsReducer,
  user: userReducer,
  Events: eventsReducer,
});
