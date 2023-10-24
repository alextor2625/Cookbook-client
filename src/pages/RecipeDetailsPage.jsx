import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { RecipesContext } from "../context/recipes.context";
import { UsersContext } from "../context/users.context";
import { ReviewsContext } from "../context/reviews.context";

const RecipeDetailsPage = () => {
const { recipeId } = useParams();
const { recipes } = useContext(RecipesContext);
const { reviews } = useContext(ReviewsContext);
const { users } = useContext(UsersContext);
const [recipe, setRecipe] = useState(null);
const [recipeReviews, setRecipeReviews] = useState([]);

useEffect(() => {
  const rcp = recipes.find((rcp) => rcp._id === recipeId);
  if (rcp) {
    setRecipe(rcp);
    let rvws = reviews.filter((rvw) => rcp.reviews.includes(rvw._id));
    if (rvws.length) {
      rvws = rvws.map(rvw =>{
        const usr = users.find(usr => usr._id === rvw.author)
        if(usr){
          rvw.author = usr
        }
        return rvw
      })
      console.log(rvws);
      setRecipeReviews(rvws);
    }
  }
}, [reviews, recipes, recipeId]);

return (
  <div>
    {recipe ? (
      <div>
        <h1>{recipe.name} Recipe</h1>
        <p>Category:{recipe.category}</p>
        <img src={recipe.image} alt="Recipe Image" />
        {recipe.author._id == recipe.alteredBy._id && <p>Created By: <Link to={`/profile/${recipe.author._id}`}>{recipe.author.name}</Link></p>}
        {recipe.author._id != recipe.alteredBy._id && <p>Altered By: <Link to={`/profile/${recipe.alteredBy._id}`}>{recipe.alteredBy.name}</Link></p>}
        
        <p>Ingredients: <span>{recipe.ingredients}</span></p>
        <p>Instructions: <span>{recipe.instructions}</span></p>
        <div>Reviews: {recipeReviews.length ? recipeReviews.map(review => {
          return (
            <div key={review._id}>
              <h4><img src="" alt="" /> <Link to={`/profile/${review.author._id}`}>{review.author.name}</Link></h4>
              <h3>{'⭐'.repeat(review.rating)} {review.title}</h3>
              <p>{review.comment}</p>
            </div>
          )}
        ): (<span>No Reviews</span>)}</div>
      </div>
    ) : (
      <div><h1>Loading</h1></div>
    )}
  </div>
);


}

export default RecipeDetailsPage