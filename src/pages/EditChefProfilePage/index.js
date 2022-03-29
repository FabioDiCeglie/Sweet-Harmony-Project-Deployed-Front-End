import { useSelector } from "react-redux";
import { selectChefUser } from "../../store/ChefUser/selectors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateChefInformation } from "../../store/ChefUser/actions";

//MATERIAL UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import("./style.css");

export default function EditChefProfilePage() {
  const dispatch = useDispatch();
  //selector
  const chef = useSelector(selectChefUser).chef;
  //console.log("what is chef", chef);

  //state
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [description, setDescription] = useState();
  const [experience, setExperience] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    if (chef) {
      setFullName(chef.fullName);
      setEmail(chef.email);
      setPhone(chef.phone);
      setLocation(chef.location);
      setImageUrl(chef.imageUrl);
      setDescription(chef.description);
      setExperience(chef.experience);
    }
  }, [chef]);

  function submitForm(event) {
    event.preventDefault();
    dispatch(
      updateChefInformation(
        fullName,
        email,
        phone,
        imageUrl,
        description,
        experience,
        location
      )
    );
  }
  return chef ? (
    <div className="EditProgileChefAllPage">
      <div>
        <h3 className="EditProfileChefTitle">Edit your profile here chef:</h3>
      </div>
      <div className="EditProfileBox">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            marginLeft: 60,
          }}
          className="BoxEditProfile"
        >
          <div className="EditProfileFields">
            {" "}
            <h4>Full name:</h4>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              style={{ width: 400 }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <h4>Email:</h4>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: 400 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4>Phone:</h4>
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              style={{ width: 400 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <h4>Location:</h4>
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              style={{ width: 400 }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: 400 }}>
            <h4>ImageUrl:</h4>
            <TextField
              id="outlined-basic"
              label="ImageUrl"
              variant="outlined"
              style={{ width: 400 }}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <h4>Descriptions:</h4>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rows={4}
              style={{ width: 400 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h4>Experience:</h4>
            <TextField
              id="outlined-multiline-flexible"
              label="Experience"
              multiline
              rows={4}
              style={{ width: 400 }}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <Button
              className="ButtonEditProfile"
              variant="contained"
              onClick={submitForm}
              type="submit"
            >
              Click here for edit!
            </Button>
          </div>
        </Box>
      </div>
    </div>
  ) : (
    "Loading..."
  );
}
