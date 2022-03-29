import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectChef } from "../../store/Chefs/selectors";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchChef } from "../../store/Chefs/actions";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

import("./style.css");

export default function MenuPage() {
  //selectors
  const chef = useSelector(selectChef);
  const { id } = useParams();

  console.log("what is profile chef", chef);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChef(id));
  }, [dispatch, id]);

  return chef ? (
    <div className="MenuPageAll">
      <div>
        <h1 style={{ textAlign: "center" }}>Menu:</h1>
        <Link to={`/detailChef/${chef.id}`}>
          <h4 style={{ marginLeft: 10, fontSize: 20 }}>Go Back to profile.</h4>
        </Link>
      </div>
      <div className="MenuPageBlocks">
        {chef.recipes.length >= 1 ? (
          chef.recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })
        ) : (
          <div>
            <h1>There are no recipes!</h1>
          </div>
        )}
      </div>
    </div>
  ) : (
    "Loading.."
  );
}
