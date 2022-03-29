import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../store/Chefs/actions";
import { selectRecipes } from "../../store/Chefs/selectors";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import("./style.css");
export default function RecipesPage() {
  //selectors
  const recipes = useSelector(selectRecipes);

  console.log("what is recipes", recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  //modify the array of recipes and make unique no repetition of title
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const recipesFiltered = recipes && getUniqueListBy(recipes, "title");
  //console.log("what is recipes filtered ", recipesFiltered);

  return (
    <div className="RecipesBlocks">
      {recipes
        ? recipesFiltered.map((recipe) => (
            <div>
              <RecipeCard recipe={recipe} recipePage={true} />
              {recipe
                ? recipe.chefs.map((chef) => (
                    <Link to={`/detailChef/${chef.id}`}>
                      <Button
                        size="small"
                        variant="contained"
                        style={{
                          marginLeft: 15,
                          marginTop: 5,
                        }}
                      >
                        Recipe from {chef.fullName}
                      </Button>
                    </Link>
                  ))
                : ""}
            </div>
          ))
        : ""}
    </div>
  );
}
