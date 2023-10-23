import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { RecipesContext } from "../context/recipes.context";
import { UsersContext } from "../context/users.context";

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const {recipes} = useContext(RecipesContext)
  const {users} = useContext(UsersContext)
  const [recipe, setRecipe] = useState({})
  
  useEffect(() => {
    const rcp = recipes.find((rcp) => rcp._id === recipeId);
    if (rcp) {
      setRecipe(rcp);
      
    }
}, [recipes, recipeId]);
return (
  <div>
      <h1>{recipe.name} Recipe</h1>
      <img src={recipe.image} alt="Recipe Image" />
      <p>Ingredients: <span>{recipe.ingredients}</span></p>
      <p>Instructions: <span>{recipe.instructions}</span></p>
      {/* <div>Reviews: {recipe.reviews.length && recipe.reviews.map(review => {
        return(
          <div key={review._id}>
              <p>{review}</p>
          </div>
        )
      })}</div> */}
  </div>
)
}

export default RecipeDetailsPage