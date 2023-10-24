import { useContext } from "react";
import { RecipesContext } from "../context/recipes.context";
import { Link } from "react-router-dom";

const BrowseRecipesPage = () => {
  const { recipes } = useContext(RecipesContext);
  console.log(recipes);

  return (
    <div>
      <h1>Browse Recipes</h1>
      {recipes.map((recipe) => {
        return (
          <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
            <div>
              <img src={recipe.image} />
              <div>
                <span>Name:{recipe.name}</span>
                <span>Category:{recipe.category}</span>

                {recipe.author._id == recipe.alteredBy._id && (
                  <span>Created By:{recipe.author.name}</span>
                )}
                {recipe.author._id != recipe.alteredBy._id && (
                  <span>Last Edited By:{recipe.alteredBy.name}</span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BrowseRecipesPage;
