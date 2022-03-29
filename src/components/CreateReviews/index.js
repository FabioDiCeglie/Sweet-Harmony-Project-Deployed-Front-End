import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import StarIcon from "@material-ui/icons/Star";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { selectUserToken } from "../../store/User/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createReviewChef } from "../../store/Chefs/actions";
import { selectUser } from "../../store/User/selectors";

export default function CreateReviews(props) {
  // console.log("what is props id", props.id);
  const user = useSelector(selectUser);
  const [button, setButton] = useState(false);
  const [name, setName] = useState(user ? user.name : "");
  const [content, setContent] = useState();
  const [rating, setRating] = useState();

  const dispatch = useDispatch();
  const tokenUser = useSelector(selectUserToken);

  function submitForm(event) {
    event.preventDefault();

    dispatch(createReviewChef(props.id, name, content, rating));
    setButton(false);
  }
  return tokenUser ? (
    <div>
      {" "}
      <Button
        startIcon={<StarIcon />}
        variant="contained"
        style={{
          marginLeft: 20,
          width: 300,
          height: 40,
          marginTop: 20,
        }}
        value={button}
        onClick={() => setButton(!button)}
      >
        Create new Reviews
      </Button>
      {button ? (
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ marginTop: 20 }}>
              {" "}
              <h4>Name: </h4>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h4>Content: </h4>
              <TextField
                id="outlined-multiline-flexible"
                label="Content"
                multiline
                rows={4}
                style={{ width: 400 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <h4>Rating: </h4>
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: 0, max: 5 } }}
                style={{ width: 80 }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>{" "}
            <Button
              startIcon={<StarIcon />}
              variant="contained"
              style={{
                marginLeft: 10,
                width: 200,
                height: 40,
                marginTop: 20,
              }}
              type="submit"
              onClick={submitForm}
            >
              Create review
            </Button>
          </Box>
        </div>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
}
