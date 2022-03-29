import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipeChef } from "../../store/ChefUser/actions";

//MATERIAL UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import("./style.css");

export default function CreateRecipeChef() {
  const dispatch = useDispatch();

  //state
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  function submitForm(event) {
    event.preventDefault();
    dispatch(createRecipeChef(title, description, image));
    setTitle("");
    setDescription("");
    setImage("");
  }
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "qmlqhgyk");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnjicmmbn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    setImage(file.url); //put the url in local state, next step you can send it to the backend
  };
  console.log("what is image", image);

  return (
    <div className="EditCreateRecipeChefAllPage">
      <div>
        <h3 className="EditCreateRecipeChefTitle">Create your recipe: </h3>
      </div>
      <div className="EditCreateRecipeBox">
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
          className="BoxCreateRecipe"
        >
          <div className="EditCreateRecipeFields">
            {" "}
            <h4>Title:</h4>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              style={{ width: 400 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input type="file" onChange={uploadImage} />
            <div>
              <img
                src={
                  image
                    ? image
                    : "https://clippingpathgreat.com/wp-content/uploads/2021/04/upload-files.jpg"
                }
                alt="Upload"
                style={{ width: 200 }}
              />
              {image ? (
                <p style={{ fontSize: 20, color: "white" }}>
                  Succesfully uploaded!
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div style={{ marginLeft: 400 }}>
            <h4>Description:</h4>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              rows={4}
              style={{ width: 400 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              className="ButtonCreateRecipe"
              variant="contained"
              onClick={submitForm}
              type="submit"
            >
              Create recipe!
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
