import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/ChefUser/actions";
import { selectToken } from "../../store/ChefUser/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";
import { fetchTypes } from "../../store/Chefs/actions";
import { selectTypes } from "../../store/Chefs/selectors";

//MATERIAL UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [priceForHour, setPriceForHour] = useState("");
  const [cookingTypes, setCookingTypes] = useState([]);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const types = useSelector(selectTypes);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      signUp(
        fullName,
        email,
        password,
        phone,
        image,
        description,
        experience,
        location,
        priceForHour,
        cookingTypes
      )
    );

    setEmail("");
    setPassword("");
    setFullName("");
  }
  console.log("what is cooking types", cookingTypes);
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
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Sign Up Chef</h1>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            type="text"
            placeholder="Phone"
            required
          />
        </Form.Group>
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
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            placeholder="Your description"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicExperience">
          <Form.Label>Experience:</Form.Label>
          <Form.Control
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            type="text"
            placeholder="Your experience"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLocation">
          <Form.Label>Location:</Form.Label>
          <Form.Control
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            type="text"
            placeholder="Your location"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPriceForHour">
          <Form.Label>Price for hour:</Form.Label>
          <Form.Control
            value={priceForHour}
            onChange={(event) => setPriceForHour(event.target.value)}
            type="text"
            placeholder="Price $"
            required
          />
        </Form.Group>
        <div>
          <h4>Types of cooking:</h4>
          <FormControl sx={{ m: 1, minWidth: 80, height: 30 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={type}
              onChange={(e) => setType(e.target.value)}
              autoWidth
              label="Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {types
                ? types.map((type) => (
                    <MenuItem value={type.id} key={type.id}>
                      {type.title}
                    </MenuItem>
                  ))
                : ""}
            </Select>
            <Button
              variant="primary"
              onClick={() => setCookingTypes([...cookingTypes, type])}
            >
              {" "}
              Add
            </Button>
          </FormControl>
          {cookingTypes
            ? cookingTypes.map((type) => {
                const cookingStyle = types.find((eachCookingType) => {
                  return eachCookingType.id === parseInt(type);
                });
                //console.log("what is each cooking style", cookingStyle);
                return (
                  <div
                    style={{ display: "inline-block" }}
                    key={cookingStyle.id}
                  >
                    <ul>
                      <li>{cookingStyle.title}</li>
                    </ul>
                  </div>
                );
              })
            : "Loading"}
        </div>
        <br />
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <NavLink to="/login">Click here to go back! </NavLink>
      </Form>
    </Container>
  );
}
