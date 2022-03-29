import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchEvent } from "../../store/Events/action";
import { selectEvent } from "../../store/Events/selectors";
import Button from "@mui/material/Button";
import { selectUserToken } from "../../store/User/selectors";
import("./style.css");

export default function Event() {
  //dispatch
  const dispatch = useDispatch();

  const event = useSelector(selectEvent);
  const userToken = useSelector(selectUserToken);

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchEvent(id));
  }, []);

  console.log("what is event", event);
  return event ? (
    <div className="EventPage">
      <div>
        <h1 style={{ textAlign: "center" }}>Detail event page: {event.name}</h1>
      </div>
      <div className="DetailsBlocks">
        <h4>Information: </h4>
        <p>{event.information}</p>
        <h4>Location: </h4>
        <p>{event.location}</p>
        <h4>Price for person: </h4>
        <p>{event.priceForPerson} $</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Dates: </h4>
          <p>{event.dates}</p>
          <h4>Start time: </h4>
          <p>{event.sTime}</p>
          <h4>End time: </h4>
          <p>{event.eTime}</p>
        </div>
        <p>Number people joined: {event.nPeople}</p>
        <p>Max number of people that can join: {event.maxNPeople} </p>
        {userToken ? (
          <Button size="small" variant="contained" style={{ marginLeft: 10 }}>
            Join
          </Button>
        ) : (
          ""
        )}
      </div>
      <div>
        <img
          src={event.image}
          alt={event.name}
          style={{ width: 400, marginLeft: 40, marginBottom: 40 }}
        />
      </div>
    </div>
  ) : (
    "Loading.."
  );
}
