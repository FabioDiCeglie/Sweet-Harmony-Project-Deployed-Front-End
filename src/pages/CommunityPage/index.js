import { useEffect, useState } from "react";
import { fetchChefsCommunity } from "../../store/Chefs/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectInformationCommunityChefs } from "../../store/Chefs/selectors";
import { createRecipeChef } from "../../store/ChefUser/actions";

//MATERIAL UI
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { selectChefUser } from "../../store/ChefUser/selectors";
import TextField from "@mui/material/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import("./style.css");

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

export default function CommunityPage() {
  const [expanded, setExpanded] = useState(false);
  const [filterByLocation, setFilterByLocation] = useState(null);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //dispatch
  const dispatch = useDispatch();

  //selectors
  const chefs = useSelector(selectInformationCommunityChefs);
  const chefLoggedIn = useSelector(selectChefUser);
  console.log("what is chef logged in", chefLoggedIn);
  //console.log
  console.log("what is chefs", chefs);

  useEffect(() => {
    dispatch(fetchChefsCommunity());
  }, []);

  const filteredChefs = !filterByLocation
    ? chefs
    : chefs.map((chef) => {
        const filterRecipes = chef.recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(filterByLocation.toLowerCase())
        );
        return {
          ...chef,
          recipes: filterRecipes,
        };
      });

  return chefs ? (
    <div className="CommunityPage">
      <div>
        <h3 className="TitleCommunityPage">
          This is the community of the chefs!
        </h3>
      </div>
      <div>
        <p className="PCommunityPage">
          Here you can find all the recipes that the chefs share!
        </p>
      </div>
      <div>
        <TextField
          style={{ marginLeft: 1060, marginBottom: 30 }}
          size="small"
          label="Search by recipes"
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
        {filteredChefs
          ? filteredChefs
              .filter((chef) => chef.id !== chefLoggedIn.chef.id)
              .map((chef) =>
                chef.recipes.length > 0 ? (
                  <div key={chef.id}>
                    {" "}
                    <List
                      sx={{
                        width: "90%",
                        marginLeft: "5%",
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Avatar
                              alt={chef.fullName}
                              src={chef.imageUrl}
                              sx={{ width: 56, height: 56 }}
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Chef name: ${chef.fullName}`}
                          secondary={`Chef location: ${chef.location}`}
                        />
                      </ListItem>
                      <ListItemText
                        secondary="All Recipes"
                        style={{ marginLeft: 10 }}
                      />
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                      <Divider variant="inset" component="li" />
                    </List>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      {chef
                        ? chef.recipes.map((recipe) => (
                            <List
                              sx={{
                                width: "90%",
                                marginLeft: "5%",
                                bgcolor: "background.paper",
                              }}
                              key={recipe.id}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={recipe.image}
                                      sx={{ width: 56, height: 56 }}
                                    />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={recipe.title} />
                                <Button
                                  variant="contained"
                                  style={{ heigth: 20 }}
                                  onClick={() =>
                                    dispatch(
                                      createRecipeChef(
                                        recipe.title,
                                        recipe.content,
                                        recipe.image
                                      )
                                    )
                                  }
                                >
                                  Copy Recipe
                                </Button>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </List>
                          ))
                        : " "}
                    </Collapse>
                  </div>
                ) : (
                  ""
                )
              )
          : "Loading.."}
      </div>
    </div>
  ) : (
    "Loading.."
  );
}
