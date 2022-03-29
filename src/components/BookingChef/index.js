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

export default function BookingChef(props) {
  const dispatch = useDispatch();
  const {
    name,
    email,
    phone,
    dates,
    sTime,
    eTime,
    informations,
    isBooked,
    id,
  } = props.bookingsChef;
  return (
    <div style={{ marginLeft: 15 }}>
      <Card variant="outlined" sx={{ maxWidth: 370, marginTop: 5 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Email: {email} <br />
            Phone: {phone} <br />
            Date: {dates} <br />
            Start Time: {sTime} <br />
            End Time: {eTime} <br />
            Information: <br />
            {informations ? informations : "none"} <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{isBooked ? "Booked" : ""}</Button>
          <Button size="small" onClick={() => dispatch(updateBookingChef(id))}>
            {isBooked ? "" : "Accept"}
          </Button>
          <Button size="small" onClick={() => dispatch(deleteBookingChef(id))}>
            {isBooked ? "" : "Delete"}
          </Button>
          <Link to={`/chefs/messages/${id}`} style={{ textDecoration: "none" }}>
            {" "}
            <Button size="small">Messages </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
