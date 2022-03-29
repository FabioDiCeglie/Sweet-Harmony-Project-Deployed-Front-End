import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { addOneLike } from "../../store/Chefs/actions";
import TextField from "@mui/material/TextField";
import { selectChefUser } from "../../store/ChefUser/selectors";
import Box from "@mui/material/Box";
import { updateChefRecipe } from "../../store/ChefUser/actions";
import { addOneLikeRecipesPage } from "../../store/Chefs/actions";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard(props) {
  const [expanded, setExpanded] = useState(false);
  const { recipe } = props;
  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [content, setContent] = useState(recipe ? recipe.content : "");
  const [image, setImage] = useState(recipe ? recipe.image : "");

  const chefLoggedIn = useSelector(selectChefUser).chef;
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function submitForm(event) {
    event.preventDefault();
    dispatch(updateChefRecipe(recipe.id, title, content, image));
    setExpanded(!expanded);
  }
  return (
    <div className="MenuCards">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader subheader={recipe.title} />
        <CardMedia
          component="img"
          height="380"
          image={recipe.image}
          alt={recipe.title}
        />

        <CardActions disableSpacing>
          {props.recipePage ? (
            <IconButton
              aria-label="add to favorites"
              onClick={() =>
                dispatch(addOneLikeRecipesPage(recipe.id, recipe.likes + 1))
              }
            >
              {" "}
              <FavoriteIcon style={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="add to favorites"
              onClick={() => dispatch(addOneLike(recipe.id, recipe.likes + 1))}
            >
              {" "}
              <FavoriteIcon style={{ color: "red" }} />
            </IconButton>
          )}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {recipe.likes}
            </Typography>
          </CardContent>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>{recipe.content}</Typography>
          </CardContent>
          {chefLoggedIn ? (
            <div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <p>Title:</p>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  size="small"
                  variant="outlined"
                  style={{ width: 200 }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p>Description:</p>
                <TextField
                  id="outlined-basic"
                  label="Content"
                  variant="outlined"
                  size="small"
                  style={{ width: 200 }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <p>Image Url:</p>
                <TextField
                  id="outlined-basic"
                  label="Image"
                  variant="outlined"
                  size="small"
                  style={{ width: 200 }}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <br />
                <Button
                  style={{ marginTop: 20, marginBottom: 10 }}
                  variant="contained"
                  onClick={submitForm}
                  type="submit"
                >
                  Edit Recipe
                </Button>
              </Box>
            </div>
          ) : (
            ""
          )}
        </Collapse>
      </Card>
    </div>
  );
}
