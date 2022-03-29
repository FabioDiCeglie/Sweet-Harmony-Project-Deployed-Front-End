import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchEvents } from "../../store/Events/action";
import { selectEvents } from "../../store/Events/selectors";
import { selectUser, selectUserToken } from "../../store/User/selectors";
import { Link } from "react-router-dom";
import { joinEvent } from "../../store/Events/action";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//material UI
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import EventIcon from "@material-ui/icons/Event";
import { selectChefUser } from "../../store/ChefUser/selectors";
import("./style.css");

export default function EventsPage() {
  //dispatch
  const dispatch = useDispatch();

  const [date, setDate] = useState(null);
  const [dateString, setDateString] = useState("");

  const events = useSelector(selectEvents);
  const userToken = useSelector(selectUserToken);
  const user = useSelector(selectUser);
  const chef = useSelector(selectChefUser);

  //Transform the date in a string is everything in dateString
  useEffect(() => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    setDateString(`${day}-0${month}-${year}`);
  }, [date]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  //simplify method for filter by location
  const filteredEvents = !date
    ? events
    : events.filter((event) => {
        return event.dates.includes(dateString);
      });

  //console.log
  //console.log("what is events ?", events);
  console.log("what is filtered events", filteredEvents);
  //console.log("what is user", user);
  console.log("what is date string", dateString);

  return user || chef ? (
    <div className="EventsPage">
      <div className="InformationEventsPage">
        <h4>Events Page</h4>
      </div>
      <div className="InformationEventsPage" style={{ marginTop: 30 }}>
        <p>
          Do you want to join a casual event hosted by an experienced chef?
          <br />
          Here is the right place for doing that!
        </p>
      </div>
      <div style={{ marginLeft: 1030 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Day of the events"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="EventsBlocks">
        {filteredEvents
          ? filteredEvents.map((event) => (
              <div className="EventsCards" key={event.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {event.information}
                      <br />
                      <hr></hr>
                      Number of people: {event.maxNPeople}
                      <br />
                      People joined: {event.users.length}
                      <hr></hr>
                      Price Event: {event.priceForPerson} $<hr></hr>
                      Date: {event.dates}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/chefs/events/${event.id}`}>
                      <Button size="small" variant="contained">
                        Know More
                      </Button>
                    </Link>
                    {userToken &&
                    !event.users.find((userId) => userId.id === user.id) ? (
                      <Button
                        size="small"
                        variant="contained"
                        style={{ marginLeft: 10 }}
                        onClick={() => dispatch(joinEvent(event.id))}
                      >
                        Join
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        style={{ marginLeft: 10, backgroundColor: "grey" }}
                        onClick={() => dispatch(joinEvent(event.id))}
                      >
                        Join
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </div>
            ))
          : "Loading.."}
      </div>
    </div>
  ) : (
    "Loading.."
  );
}
