import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RecipesContext } from "../context/recipes.context";
import { UsersContext } from "../context/users.context";
import { ReviewsContext } from "../context/reviews.context";
import { Button, Card } from "react-bootstrap";
import CreateReview from "../components/CreateReview";
import MySpinner from "./../components/MySpinner";
import { AuthContext } from "../context/auth.context";
import EditReview from "./../components/EditReview";
import { del, put } from "../services/authService";
import EditRecipe from "../components/EditRecipe";
const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const { recipes } = useContext(RecipesContext);
  const { reviews } = useContext(ReviewsContext);
  const { users } = useContext(UsersContext);
  const { user, storeToken, authenticateUser } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [recipeReviews, setRecipeReviews] = useState([]);
  const [showCreateReviewForm, setShowCreateReviewForm] = useState(false);
  const [showEditReviewForm, setShowEditReviewForm] = useState(false);
  const [showEditRecipeForm, setShowEditRecipeForm] = useState(false);
  const [showCopyEditRecipeForm, setShowCopyEditRecipeForm] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [userHasReview, setUserHasReview] = useState(false);

  const navigate = useNavigate();

  const toggleCopyEditRecipeForm = () => {
    showCopyEditRecipeForm
      ? setShowCopyEditRecipeForm(false)
      : setShowCopyEditRecipeForm(true);
  };
  const toggleEditRecipeForm = () => {
    showEditRecipeForm
      ? setShowEditRecipeForm(false)
      : setShowEditRecipeForm(true);
  };
  const toggleCreateReviewForm = () => {
    showCreateReviewForm
      ? setShowCreateReviewForm(false)
      : setShowCreateReviewForm(true);
  };

  const handleAddRecipe = (recipeId) => {
    put(`/recipes/add`, { recipeId }).then((response) => {
      console.log(response.data);
      storeToken(response.data.authToken);
      authenticateUser();
      window.location.reload(false);
    });
  };
  const handleRemoveRecipe = (recipeId) => {
    del(`/recipes/remove/${recipeId}`).then((response) => {
      console.log(response.data);
      storeToken(response.data.authToken);
      authenticateUser();
      window.location.reload(false);
    });
  };
  const handleDeleteRecipe = (recipeId) => {
    del(`/recipes/delete/${recipeId}`).then((response) => {
      console.log(response.data);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/profile");
      window.location.reload(false);
    });
  };
  const toggleEditReviewForm = (reviewId) => {
    setSelectedReviewId(reviewId);
    showEditReviewForm
      ? setShowEditReviewForm(false)
      : setShowEditReviewForm(true);
  };
  useEffect(() => {
    const rcp = recipes.find((rcp) => rcp._id === recipeId);
    if (rcp) {
      setRecipe(rcp);
      let rvws = reviews.filter((rvw) => rcp.reviews.includes(rvw._id));
      if (rvws.length) {
        rvws = rvws.map((rvw) => {
          const usr = users.find((usr) => usr._id === rvw.author);
          if (usr) {
            rvw.author = usr;
          }
          return rvw;
        });
        console.log(rvws);
        setRecipeReviews(rvws);
        if (recipeReviews) {
          setUserHasReview(
            recipeReviews.find((review) => review.author._id === user._id)
          );
        }
      }
    }
  }, [reviews, recipes, recipeId, users, selectedReviewId]);
  return (
    <div className="center">
      {recipe ? (
        <div>
          {!showEditRecipeForm ? (
            <>
              <Card key={recipe._id} style={{ width: "30rem" }}>
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  style={{ width: "20em" }}
                  className="center-image"
                />
                <Card.Body className="center-card-text">
                  <Card.Title>{recipe.name} Recipe</Card.Title>
                  <Card.Text>
                    {" "}
                    {!(recipe.alteredBy._id == user._id) ? (
                      <>
                        {!user.recipes.find((rcp) => recipe._id == rcp._id) ? (
                          <>
                            <Button onClick={() => handleAddRecipe(recipeId)}>
                              Add Recipe
                            </Button>{" "}
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleRemoveRecipe(recipeId)}
                            >
                              Remove Recipe
                            </Button>{" "}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleDeleteRecipe(recipeId)}>
                          Delete Recipe
                        </Button>{" "}
                      </>
                    )}
                    <Button onClick={toggleCopyEditRecipeForm}>CopyEdit</Button>
                  </Card.Text>

                  <Card.Text>Category:{recipe.category}</Card.Text>
                  <Card.Text>Description: {recipe.description}</Card.Text>
                  {recipe.author._id == recipe.alteredBy._id && (
                    <Card.Text>
                      Created By:{" "}
                      <Link to={`/profile/${recipe.author._id}`}>
                        {recipe.author.name}
                      </Link>
                    </Card.Text>
                  )}
                  {recipe.author._id != recipe.alteredBy._id && (
                    <Card.Text>
                      Altered By:{" "}
                      <Link to={`/profile/${recipe.alteredBy._id}`}>
                        {recipe.alteredBy.name}
                      </Link>
                    </Card.Text>
                  )}
                  <Card.Text>
                    Ingredients: <span>{recipe.ingredients}</span>
                  </Card.Text>
                  <Card.Text>
                    Instructions: <span>{recipe.instructions}</span>
                  </Card.Text>
                  {recipe.alteredBy._id == user._id && (
                    <Card.Text>
                      <Button onClick={toggleEditRecipeForm}>Edit</Button>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <EditRecipe recipeId={recipeId} toggleForm={toggleEditRecipeForm} />
          )}
          {!(showCopyEditRecipeForm || showEditRecipeForm) && <div>
            {!showCreateReviewForm ? (
              <>
                {!(
                  recipe.author._id == user._id ||
                  recipe.alteredBy._id == user._id
                ) ? (
                  !userHasReview ? (
                    <div className="center">
                      <Button
                        variant="primary"
                        onClick={toggleCreateReviewForm}
                      >
                        Make A Review
                      </Button>
                    </div>
                  ) : (
                    <div className="center">
                      <Button variant="primary" disabled>
                        Thank You For Reviewing
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="center">
                    <Button variant="primary" disabled>
                      You Own This Recipe
                    </Button>
                  </div>
                )}
                <div className="center">
                  Reviews:{" "}
                  {recipeReviews.length ? (
                    <div>
                      {!showEditReviewForm ? (
                        <>
                          {recipeReviews.map((review) => {
                            return (
                              <div key={review._id}>
                                <h4>
                                  <img src="" alt="" />{" "}
                                  <Link to={`/profile/${review.author._id}`}>
                                    {review.author.name}
                                  </Link>
                                </h4>
                                <h3>
                                  {"⭐".repeat(review.rating)} {review.title}
                                </h3>
                                <p>{review.comment}</p>
                                {userHasReview && (
                                  <Button
                                    onClick={() =>
                                      toggleEditReviewForm(review._id)
                                    }
                                  >
                                    {" "}
                                    Edit
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <EditReview
                          recipeId={recipeId}
                          reviewId={selectedReviewId}
                          toggleForm={toggleEditReviewForm}
                        />
                      )}
                    </div>
                  ) : (
                    <span>No Reviews</span>
                  )}
                </div>
              </>
            ) : (
              <CreateReview
                recipeId={recipe._id}
                toggleForm={toggleCreateReviewForm}
              />
            )}
          </div>}
        </div>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};
export default RecipeDetailsPage;
