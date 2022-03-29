import React from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import FaceIcon from "@material-ui/icons/Face";
import { Link } from "react-router-dom";
import { logOutUser } from "../../store/User/actions";
export default function LogOutUser() {
  const dispatch = useDispatch();

  return (
    <>
      <Link to="/profile/user">
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
        onClick={() => dispatch(logOutUser())}
      >
        Logout
      </Button>
    </>
  );
}
