import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChefs } from "../../store/Chefs/actions";
import { useSelector } from "react-redux";
import { selectChefs } from "../../store/Chefs/selectors";
import { Link } from "react-router-dom";
import { fetchReviews } from "../../store/Chefs/actions";
import { selectReviews } from "../../store/Chefs/selectors";
//Material UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Rating from "@mui/material/Rating";
import("./style.css");

export default function ChefsPage() {
  //state
  //const [list, setList] = useState();
  const [filterByLocation, setFilterByLocation] = useState(null);
  //dispatch
  const dispatch = useDispatch();

  //selectors
  const chefs = useSelector(selectChefs);
  const reviews = useSelector(selectReviews);

  console.log("what is reviews", reviews);
  //2 method for filter by location
  // useEffect(() => {
  //   if (!filterByLocation) {
  //     setList(chefs);
  //   } else {
  //     setList(
  //       chefs.filter((chef) => {
  //         return chef.location
  //           .toLowerCase()
  //           .includes(filterByLocation.toLowerCase());
  //       })
  //     );
  //   }
  // }, [filterByLocation, chefs]);

  // useEffect(() => {
  //   if (chefs) {
  //     setList(chefs);
  //   }
  // }, [chefs]);

  useEffect(() => {
    dispatch(fetchChefs());
    dispatch(fetchReviews());
  }, [dispatch]);

  //simplify method for filter by location
  const filteredChefs = !filterByLocation
    ? chefs
    : chefs.filter((chef) => {
        return chef.location
          .toLowerCase()
          .includes(filterByLocation.toLowerCase());
      });

  return (
    <div className="ChefsPages">
      <h2 className="TitleChefsPage">Private chef at your home</h2>
      <TextField
        style={{ marginLeft: 1060 }}
        size="small"
        label="Search by location"
        value={filterByLocation}
        onChange={(e) => setFilterByLocation(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <SearchIcon style={{ color: "blue" }} />
            </InputAdornment>
          ),
        }}
      />

      <div className="ChefsBlock">
        {filteredChefs
          ? filteredChefs.map((chef) => {
              const currentChefReviews =
                reviews &&
                reviews.filter((review) => review.chefid === chef.id);

              console.log("current chef reviews", currentChefReviews);
              const averageRating =
                currentChefReviews &&
                (
                  currentChefReviews.reduce((acc, review) => {
                    return acc + review.rating;
                  }, 0) / currentChefReviews.length
                ).toFixed(2);

              console.log("average", averageRating);
              return (
                <Card
                  sx={{ maxWidth: 370 }}
                  key={chef.id}
                  className="ChefsCard"
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={chef.imageUrl}
                    alt={chef.fullName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {chef.fullName}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      <strong> Experience: </strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {" "}
                      {chef.experience}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      <strong> Information: </strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Location: </strong>
                      {chef.location} - <strong>Price for hour: </strong>
                      {chef.priceForHour}
                    </Typography>
                    <strong>Ratings: </strong>
                    <br />
                    <Rating name="read-only" value={averageRating} readOnly />
                  </CardContent>
                  <CardActions>
                    <Link to={`/detailChef/${chef.id}`}>
                      <Button
                        size="medium"
                        variant="contained"
                        startIcon={<InfoIcon />}
                      >
                        More
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              );
            })
          : "Loading.."}
      </div>
    </div>
  );
}
