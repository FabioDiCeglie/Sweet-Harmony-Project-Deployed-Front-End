import { useState } from "react";

import Button from "@mui/material/Button";
import StarIcon from "@material-ui/icons/Star";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectChef } from "../../store/Chefs/selectors";
import Rating from "@mui/material/Rating";
import("./style.css");

export default function ReviewsChef() {
  const [button, setButton] = useState(false);

  const chefReviews = useSelector(selectChef).reviews;

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<StarIcon />}
        style={{
          marginLeft: 20,
          width: 170,
          height: 40,
          marginTop: 20,
        }}
        value={button}
        onClick={() => setButton(!button)}
      >
        Reviews
      </Button>
      {button ? (
        <div className="ReviewBlock">
          <div>
            {chefReviews && chefReviews.length
              ? chefReviews.map((review) => {
                  return (
                    <div key={chefReviews.id}>
                      <Stack>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>
                          {review.name[0]}
                        </Avatar>{" "}
                        Name: {review.name}
                        <br />
                        Review: {review.content} <br />
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                        <hr></hr>
                      </Stack>
                    </div>
                  );
                })
              : "Loading.." && "You don't have any reviews"}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
