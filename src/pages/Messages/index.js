import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createMessages, fetchMessages } from "../../store/ChefUser/actions";
import { selectMessages } from "../../store/ChefUser/selectors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button";
import { selectUser } from "../../store/User/selectors";
import { selectChefUser } from "../../store/ChefUser/selectors";

import("./style.css");

export default function Messages() {
  const [book, setBook] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const messagesChef = useSelector(selectMessages);
  const user = useSelector(selectUser);
  const chef = useSelector(selectChefUser);

  useEffect(() => {
    dispatch(fetchMessages(id));
  }, [dispatch, id]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      createMessages(
        id,
        message,
        chef ? chef.chef?.id : null,
        user ? user?.id : null
      )
    );
    setBook(false);
    setMessage("");
  }

  console.log("what is id", id);
  console.log("what is message", messagesChef);

  return (
    <div className="PageChat">
      <div>
        <h4 style={{ textAlign: "center" }}>Messages:</h4>
      </div>
      <br />
      {messagesChef
        ? messagesChef.map((message) => {
            if (message.chefId) {
              return (
                <div class="message-blue">
                  <p class="message-content">
                    {chef.chef ? (
                      "You"
                    ) : (
                      <div>Chef {message.chef?.fullName}</div>
                    )}
                    : {message.message}
                  </p>
                </div>
              );
            } else if (message.userId) {
              return (
                <div class="message-orange">
                  <p class="message-content">
                    {user ? "You" : <div>User {message.user?.name}</div>}:{" "}
                    {message.message}
                  </p>
                </div>
              );
            } else {
              return "";
            }
          })
        : ""}
      <div>
        <Button
          variant="contained"
          startIcon={<CommentIcon />}
          style={{
            width: 120,
            height: 40,
            marginTop: 60,
            marginLeft: 100,
          }}
          onClick={() => setBook(!book)}
        >
          Message
        </Button>
      </div>
      <div>
        {book ? (
          <div>
            <h4 style={{ marginTop: 20 }}>Create your message:</h4>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Informations"
                multiline
                rows={4}
                style={{ width: 400 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <br />
              <Button
                variant="contained"
                style={{ marginLeft: 20 }}
                onClick={submitForm}
                type="submit"
              >
                Send!
              </Button>
            </Box>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
