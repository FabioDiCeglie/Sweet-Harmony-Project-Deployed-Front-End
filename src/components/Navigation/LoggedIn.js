import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/ChefUser/actions";
import Button from "@mui/material/Button";
import FaceIcon from "@material-ui/icons/Face";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logOutProcess = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <Link to="/profile/chef">
        <Button
          variant="text"
          startIcon={<FaceIcon />}
          style={{
            width: 90,
            height: 40,
            marginRight: 100,
            color: "black",
          }}
        >
          Profile
        </Button>
      </Link>
      <Button
        variant="contained"
        style={{ backgroundColor: "black", marginRight: 10 }}
        onClick={() => logOutProcess()}
      >
        Logout
      </Button>
    </>
  );
}
