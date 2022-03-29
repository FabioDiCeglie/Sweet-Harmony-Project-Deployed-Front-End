import { useSelector } from "react-redux";
import { selectChefUser } from "../../store/ChefUser/selectors";
import BookingChef from "../../components/BookingChef";
import { Link } from "react-router-dom";

//Material UI
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import KitchenIcon from "@material-ui/icons/Kitchen";
import Button from "@mui/material/Button";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import("./style.css");

export default function ChefProfile() {
  //selectors
  const profileChef = useSelector(selectChefUser);

  //console.log
  console.log("what is profile chef", profileChef);

  return profileChef.chef ? (
    <div>
      {" "}
      <h1 className="ProfileChefTitle">
        Your Profile: {profileChef.chef.fullName}
      </h1>
      <Button href="/edit" style={{ marginLeft: 10 }}>
        Edit your profile
      </Button>
      <Button href="/profile/chef/recipe/create" style={{ marginLeft: 10 }}>
        Create Recipe
      </Button>
      <Button href="/profile/chef/event/create" style={{ marginLeft: 1000 }}>
        Create Event
      </Button>
      <div className="ProfileChefBlock">
        <div>
          <img
            src={profileChef.chef.imageUrl}
            alt={profileChef.chef.fullName}
            className="ProfileImageChef"
          />
        </div>
        <div className="InformationChef">
          <p>
            <strong>Description: </strong>
            {profileChef.chef.description}
          </p>
          <p>
            <strong>Experience: </strong>
            {profileChef.chef.experience}
          </p>
          <p>
            <strong>Information: </strong> <br />
            Location: {profileChef.chef.location} <br />
            Email: {profileChef.chef.email} <br />
            Phone: {profileChef.chef.phone} <br />
          </p>
          <p>
            <strong>Type of cooking:</strong>
          </p>
          {
            <Stack direction="row" spacing={2}>
              {profileChef.chef.types.length ? (
                profileChef.chef.types.map((type) => {
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
          }
          <Link to={`/detailChef/${profileChef.chef.id}/menu`}>
            <Button
              variant="contained"
              startIcon={<MenuBookIcon />}
              style={{ marginTop: 30 }}
            >
              See your menu
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <h1 className="BookingsTitle">Your Bookings:</h1>
      </div>
      <div className="BookingsChefProfile">
        {profileChef.bookings
          ? profileChef.bookings.map((booking) => (
              <BookingChef key={booking.id} bookingsChef={booking} />
            ))
          : ""}
      </div>
    </div>
  ) : (
    "Loading.."
  );
}
