import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChef } from "../../store/Chefs/actions";
import { useSelector } from "react-redux";
import { selectChef } from "../../store/Chefs/selectors";
import BookingChefForm from "../../components/BookingChefForm";
import ReviewsChef from "../../components/ReviewsChefs";
import CreateReviews from "../../components/CreateReviews";
import { Link } from "react-router-dom";

//Material UI
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import KitchenIcon from "@material-ui/icons/Kitchen";
import Button from "@mui/material/Button";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import("./style.css");

export default function ChefDetailPage() {
  //parameter
  const { id } = useParams();

  //dispatch
  const dispatch = useDispatch();

  //selectors
  const chef = useSelector(selectChef);

  //console.log
  console.log("what is chef", chef);

  useEffect(() => {
    dispatch(fetchChef(id));
  }, [dispatch]);

  return chef ? (
    <div style={{ marginBottom: 100 }}>
      <div>
        <h1 className="ChefTitle">Chef: {chef.fullName}</h1>
      </div>
      <div className="ChefBlock">
        <div>
          <img src={chef.imageUrl} alt={chef.fullName} className="ImageChef" />
          <ReviewsChef />
          <CreateReviews id={id} />
        </div>
        <div className="InformationChef">
          <p>
            <strong>Description: </strong>
            {chef.description}
          </p>
          <p>
            <strong>Experience: </strong>
            {chef.experience}
          </p>
          <p>
            <strong>Information: </strong> <br />
            Location: {chef.location} <br />
            Email: {chef.email} <br />
            Phone: {chef.phone} <br />
            Price for hour: {chef.priceForHour}$ <br />
          </p>
          <p>
            <strong>Type of cooking:</strong>
          </p>
          <Stack direction="row" spacing={2}>
            {chef.types.length ? (
              chef.types.map((type) => {
                return (
                  <Chip
                    key={type.id}
                    icon={<KitchenIcon style={{ color: "black" }} />}
                    label={type.title}
                    style={{
                      backgroundColor: "green",
                      color: "black",
                      width: 120,
                      height: 40,
                    }}
                  />
                );
              })
            ) : (
              <Chip
                icon={<KitchenIcon style={{ color: "black" }} />}
                label="Any type of cooking"
                style={{
                  backgroundColor: "green",
                  color: "black",
                  width: 180,
                  height: 40,
                }}
              />
            )}
          </Stack>
          <BookingChefForm id={id} />
        </div>
        <Link to={`/detailChef/${id}/menu`}>
          <Button
            variant="contained"
            startIcon={<MenuBookIcon />}
            style={{
              width: 120,
              height: 60,
              marginTop: 408,
            }}
          >
            Menu
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    "Loading.."
  );
}
