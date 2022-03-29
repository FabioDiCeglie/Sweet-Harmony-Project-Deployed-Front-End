import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import ChefsPage from "./pages/ChefsPage";
import ChefDetailPage from "./pages/ChefDetailPage";
import ChefProfile from "./pages/ChefProfile";
import EditChefProfilePage from "./pages/EditChefProfilePage";
import SignUpPage from "./pages/SignUpPage";
import SignUpUser from "./pages/SignUpUser";
import LogInUser from "./pages/LoginUser";
import UserProfile from "./pages/UserProfile";
import MenuPage from "./pages/MenuPage";
import CreateRecipeChef from "./pages/CreateRecipeChef";
import CommunityPage from "./pages/CommunityPage";
import RecipesPage from "./pages/RecipesPage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import CreateEventChef from "./pages/CreateEventChef";
import Footer from "./components/Footer";
import Messages from "./pages/Messages";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/ChefUser/actions";
import { getUserToken } from "./store/User/actions";
import { selectUserToken } from "./store/User/selectors";
import { selectToken } from "./store/ChefUser/selectors";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  const token = useSelector(selectToken);
  const tokenUser = useSelector(selectUserToken);

  useEffect(() => {
    console.log("what is token user", tokenUser);
    console.log("what is toke chef", token);
    if (token) {
      dispatch(getUserWithStoredToken());
    }
    if (tokenUser) {
      dispatch(getUserToken());
    }
  }, [dispatch, token, tokenUser]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/chefs" element={<ChefsPage />} />
        <Route exact path="/recipes" element={<RecipesPage />} />
        <Route exact path="/chefs/events" element={<EventsPage />} />
        <Route exact path="/chefs/messages/:id" element={<Messages />} />
        <Route exact path="/chefs/events/:id" element={<EventPage />} />
        <Route exact path="/detailChef/:id" element={<ChefDetailPage />} />
        <Route exact path="/detailChef/:id/menu" element={<MenuPage />} />
        <Route exact path="/profile/chef" element={<ChefProfile />} />
        <Route
          exact
          path="/profile/chef/community"
          element={<CommunityPage />}
        />
        <Route
          exact
          path="/profile/chef/recipe/create"
          element={<CreateRecipeChef />}
        />
        <Route
          exact
          path="/profile/chef/event/create"
          element={<CreateEventChef />}
        />
        <Route exact path="/profile/user" element={<UserProfile />} />
        <Route exact path="/edit" element={<EditChefProfilePage />} />
        <Route path="/signup/page" element={<SignUpPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/user" element={<SignUpUser />} />
        <Route path="/login/user" element={<LogInUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
