import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBookingChef } from "../../store/Chefs/actions";
import { selectUser, selectUserToken } from "../../store/User/selectors";
import { useSelector } from "react-redux";

//material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import EventIcon from "@material-ui/icons/Event";
import("./style.css");

export default function BookingChefForm(props) {
  //state
  const [book, setBook] = useState(false);
  const [date, setDate] = useState(null);
  const [dateString, setDateString] = useState("");
  const [startTimeString, setStartTimeString] = useState("");
  const [endTimeString, setEndTimeString] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [informations, setInformations] = useState("");

  //dispatch
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  console.log("what is user", user);

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
      createBookingChef(
        dateString,
        startTimeString,
        endTimeString,
        name,
        email,
        phone,
        informations,
        props.id,
        user ? user.id : null
      )
    );
    setBook(false);
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setInformations("");
  }
  return (
    <div>
      <Button
        variant="contained"
        startIcon={<EventIcon />}
        style={{
          width: 180,
          height: 60,
          marginTop: 30,
        }}
        onClick={() => setBook(!book)}
      >
        Book
      </Button>
      <div className="BookingFormBlock">
        {book ? (
          <div>
            <h4>Create your booking:</h4>
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
                  label="Day of the booking"
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
                label="Email Required"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone Required"
                placeholder="Your phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <br />
              <TextField
                id="outlined-multiline-flexible"
                label="Informations"
                multiline
                rows={4}
                style={{ width: 400 }}
                value={informations}
                onChange={(e) => setInformations(e.target.value)}
              />
              <br />
              <Button
                variant="contained"
                style={{ marginLeft: 20 }}
                onClick={submitForm}
                type="submit"
              >
                Book here!
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
