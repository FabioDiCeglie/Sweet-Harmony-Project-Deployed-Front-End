import React from "react";
import NavbarItem from "./NavbarItem";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../store/User/selectors";
import { selectToken } from "../../store/ChefUser/selectors";
export default function LoggedOut() {
  const tokenUser = useSelector(selectUserToken);
  const token = useSelector(selectToken);
  return (
    <>
      {!tokenUser && !token ? (
        <NavbarItem path="/login" linkText="Portal Chef🔪" />
      ) : (
        ""
      )}
    </>
  );
}
