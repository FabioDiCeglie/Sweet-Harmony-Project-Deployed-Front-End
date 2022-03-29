import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import EventIcon from "@material-ui/icons/Event";
import { createChefEvent } from "../../store/Events/action";
import("./style.css");

export default function BookingChefForm(props) {
  //state
  const [date, setDate] = useState(null);
  const [dateString, setDateString] = useState("");
  const [startTimeString, setStartTimeString] = useState("");
  const [endTimeString, setEndTimeString] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [maxNPeople, setMaxNPeople] = useState("");
  const [priceForPerson, setPriceForPerson] = useState("");
  const [information, setInformation] = useState("");

  //dispatch
  const dispatch = useDispatch();

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

  //Transform the date in a string is everything in dateString
  useEffect(() => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    setDateString(`${day}-${month}-${year}`);
  }, [date]);

  //Transform the time in a string is everything in startTimeString
  useEffect(() => {
    const newTime = new Date(startTime);
    const time = newTime.getHours() + ":" + newTime.getMinutes();
    setStartTimeString(`${time}`);
  }, [startTime]);

  //Transform the time in a string is everything in endTimeString
  useEffect(() => {
    const newTime = new Date(endTime);
    const time = newTime.getHours() + ":" + newTime.getMinutes();
    setEndTimeString(`${time}`);
  }, [endTime]);

  // console.log("what is start time", startTimeString);
  //   console.log("what is end time", endTimeString);
  //   console.log("what date string", dateString);
  //   console.log("name", name);
  //   console.log("email", email);
  //   console.log("phone", phone);
  //   console.log("informations", informations);
  //    console.log("what is props id", props.id);

  function submitForm(event) {
    event.preventDefault();
    dispatch(
      createChefEvent(
        dateString,
        startTimeString,
        endTimeString,
        name,
        location,
        image,
        maxNPeople,
        priceForPerson,
        information
      )
    );
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setName("");
    setLocation("");
    setImage("");
    setMaxNPeople("");
    setPriceForPerson("");
    setInformation("");
  }
  return (
    <div className="EventFormBlock">
      <div>
        <h4>Create your event:</h4>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Day of the event"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <br />
          <TextField
            required
            id="outlined-required"
            label="Name Require"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Location Required"
            placeholder="Your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
          <TextField
            id="outlined-multiline-flexible"
            label="Informations"
            multiline
            rows={4}
            style={{ width: 400 }}
            value={information}
            onChange={(e) => setInformation(e.target.value)}
          />
          <br />
          <TextField
            id="outlined-number"
            label="Number of people"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: 200 }}
            value={maxNPeople}
            onChange={(e) => setMaxNPeople(e.target.value)}
          />

          <TextField
            id="outlined-number"
            label="Price for person"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: 200 }}
            value={priceForPerson}
            onChange={(e) => setPriceForPerson(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            style={{ marginLeft: 10, marginTop: 5 }}
            onClick={submitForm}
            type="submit"
            startIcon={<EventIcon />}
          >
            Create your event!
          </Button>
        </Box>
      </div>
    </div>
  );
}
