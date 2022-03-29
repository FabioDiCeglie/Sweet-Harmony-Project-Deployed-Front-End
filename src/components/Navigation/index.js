import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/ChefUser/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { selectUserToken } from "../../store/User/selectors";
import LogOutUser from "./LogOutUser";
import("./style.css");

export default function Navigation() {
  const token = useSelector(selectToken);
  const tokenUser = useSelector(selectUserToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar expand="lg" className="NavBar">
      <Navbar.Brand as={NavLink} to="/" className="LogoNav">
        Sweet Harmony
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Home🏠" />
          <NavbarItem path="/chefs" linkText="Chefs👨‍🍳" />
          {tokenUser || token ? (
            <NavbarItem path="/chefs/events" linkText="Events📅" />
          ) : (
            ""
          )}
          {!token ? <NavbarItem path="/recipes" linkText="Recipes🍽️" /> : ""}
          {!tokenUser ? (
            <NavbarItem path="/login/user" linkText="Log In" />
          ) : (
            <LogOutUser />
          )}
          {!token && !tokenUser ? (
            <NavbarItem path="/signup/page" linkText="Sign Up🤌🏾" />
          ) : (
            ""
          )}
          {token ? (
            <NavbarItem
              path="/profile/chef/community"
              linkText="Chef Community🍽️"
            />
          ) : (
            ""
          )}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
