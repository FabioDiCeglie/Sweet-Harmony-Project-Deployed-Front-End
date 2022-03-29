import { useSelector } from "react-redux";
import { selectUser } from "../../store/User/selectors";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import {
  deleteBookingChef,
  updateBookingChef,
} from "../../store/ChefUser/actions";
import { Link } from "react-router-dom";
import("./style.css");

export default function UserProfile() {
  //selector
  const user = useSelector(selectUser);

  console.log("what is user", user);
  return user ? (
    <div className="UserProfileBlocks">
      <div>
        <h1 style={{ textAlign: "center" }}>This is your profile</h1>
      </div>
      <div className="UserProfileInformations">
        <h4>Your email: {user.email}</h4>
        <h4>Your name: {user.name}</h4>
      </div>
      <div>
        <h1 className="BookingsTitle">Your Bookings:</h1>
      </div>
      {user.bookings
        ? user.bookings.map((booking) => (
            <div style={{ marginLeft: 15 }}>
              <Card
                variant="outlined"
                sx={{ maxWidth: 370, marginTop: 5, marginBottom: 10 }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    Booking
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Phone: {booking.phone} <br />
                    Date: {booking.dates} <br />
                    Start Time: {booking.sTime} <br />
                    End Time: {booking.eTime} <br />
                    Information: <br />
                    {booking.informations ? booking.informations : "none"}{" "}
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">
                    {booking.isBooked ? "Booked" : "To confirm"}
                  </Button>
                  <Link
                    to={`/chefs/messages/${booking.id}`}
                    style={{ textDecoration: "none", marginLeft: 180 }}
                  >
                    {" "}
                    <Button size="small">Messages </Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ))
        : ""}
    </div>
  ) : (
    "Loading.."
  );
}
