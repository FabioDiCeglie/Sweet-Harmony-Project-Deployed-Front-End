import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/ChefUser/selectors";

import { selectUserToken } from "../../store/User/selectors";

import("./style.css");
export default function Footer() {
  const token = useSelector(selectToken);
  const tokenUser = useSelector(selectUserToken);

  return (
    <div className="FooterAll">
      <Navbar expand="lg">
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="LogoNav"
          style={{ marginLeft: 80, marginTop: 60, marginBottom: 60 }}
        >
          Sweet Harmony
        </Navbar.Brand>
      </Navbar>
      <div className="FirstColumnFooter">
        <NavLink to="/" style={{ color: "black", textDecoration: "none" }}>
          Home🏠
        </NavLink>
        <br />
        <br />
        <NavLink to="/chefs" style={{ color: "black", textDecoration: "none" }}>
          Chefs👨‍🍳
        </NavLink>
      </div>
      <div className="SecondColumnFooter">
        {" "}
        {tokenUser ? (
          <NavLink
            to="/chefs/events"
            style={{ color: "black", textDecoration: "none" }}
          >
            Events📅
          </NavLink>
        ) : (
          ""
        )}
        <br />
        <br />
        {!token ? (
          <NavLink
            to="/recipes"
            style={{ color: "black", textDecoration: "none" }}
          >
            Recipes🍽️
          </NavLink>
        ) : (
          ""
        )}
        {token ? (
          <NavLink
            to="/profile/chef/community"
            style={{ color: "black", textDecoration: "none" }}
          >
            Chef Community🍽️
          </NavLink>
        ) : (
          ""
        )}
      </div>
      <div className="ThirdColumnFooter">
        {!token && !tokenUser ? (
          <NavLink
            to="/signup/page"
            style={{ color: "black", textDecoration: "none" }}
          >
            Sign Up🤌🏾
          </NavLink>
        ) : (
          ""
        )}
        <br />
        <br />
        {!tokenUser && !token ? (
          <NavLink
            to="/login/user"
            style={{ color: "black", textDecoration: "none" }}
          >
            Log In
          </NavLink>
        ) : (
          ""
        )}
        <br />
        <br />
      </div>
    </div>
  );
}
