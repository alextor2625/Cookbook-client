import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { del, put } from "../services/authService";
import { RecipesContext } from "../context/recipes.context";
import { UsersContext } from "../context/users.context";
import { ReviewsContext } from "../context/reviews.context";
import { AuthContext } from "../context/auth.context";
import { CookbooksContext } from "../context/cookbooks.context";
import { Button, Card } from "react-bootstrap";
import CreateReview from "../components/CreateReview";
import MySpinner from "./../components/MySpinner";
import EditReview from "./../components/EditReview";
import EditRecipe from "../components/EditRecipe";
import CopyEditRecipe from "../components/CopyEditRecipe";
import AddToCookBook from "../components/AddToCookBook";
const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const { recipes } = useContext(RecipesContext);
  const { reviews, setNewReview } = useContext(ReviewsContext);
  const { users, setNewUsers } = useContext(UsersContext);
  const { setNewCookbook } = useContext(CookbooksContext);
  const { user, storeToken, authenticateUser, setNewUser } =
    useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [recipeReviews, setRecipeReviews] = useState([]);
  const [showCreateReviewForm, setShowCreateReviewForm] = useState(false);
  const [showEditReviewForm, setShowEditReviewForm] = useState(false);
  const [showEditRecipeForm, setShowEditRecipeForm] = useState(false);
  const [showCopyEditRecipeForm, setShowCopyEditRecipeForm] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [userHasReview, setUserHasReview] = useState(false);
  const [ratingAvg, setRatingAvg] = useState(0);

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
      setNewUser(true);
      setNewCookbook(true);
      setNewReview(true);
      setNewUsers(true);
      // window.location.reload(false);
    });
  };
  const handleRemoveRecipe = (recipeId) => {
    del(`/recipes/remove/${recipeId}`).then((response) => {
      console.log(response.data);
      storeToken(response.data.authToken);
      authenticateUser();
      setNewUser(true);
      setNewCookbook(true);
      setNewReview(true);
      setNewUsers(true);
      // window.location.reload(false);
    });
  };
  const handleDeleteRecipe = (recipeId) => {
    del(`/recipes/delete/${recipeId}`)
      .then((response) => {
        console.log("Recipe Deleted", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/profile");
        setNewUser(true);
        setNewCookbook(true);
        setNewReview(true);
        setNewUsers(true);
        // window.location.reload(false);
      })
      .catch((error) => console.log(error));
  };
  const toggleEditReviewForm = (reviewId) => {
    setSelectedReviewId(reviewId);
    showEditReviewForm
      ? setShowEditReviewForm(false)
      : setShowEditReviewForm(true);
  };

  const calcAvg = (reviewsArr) => {
    let sum = 0;
    reviewsArr.forEach((review) => {
      sum+=review.rating
        })
        return Math.ceil(sum/reviewsArr.length)
  }
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
        const avg = calcAvg(rvws)
        setRatingAvg(avg)
        console.log(rvws);
        setRecipeReviews(rvws);
        if (recipeReviews) {
          setUserHasReview(
            recipeReviews.find((review) => review.author._id === user._id)
          );
        }
      }
    }
  }, [reviews, recipes, recipeId, users, selectedReviewId, user]);
  return (
    <div className="center">
      {recipe ? (
        <div>
          {!showCopyEditRecipeForm ? (
            !showEditRecipeForm ? (
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
                    <AddToCookBook recipeId={recipeId} />
                    <Card.Text>
                      {" "}
                      {!(recipe.alteredBy._id == user._id) ? (
                        <>
                          {!user.recipes.find(
                            (rcp) => recipe._id == rcp._id
                          ) ? (
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
                      <Button onClick={toggleCopyEditRecipeForm}>
                        CopyEdit
                      </Button>
                    </Card.Text>

                    <Card.Text>Category: {recipe.category}</Card.Text>
                    {ratingAvg? <Card.Text>Rating: {"⭐".repeat(ratingAvg)}</Card.Text> : <Card.Text>No Ratings Yet</Card.Text>}
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
                    <Card.Text style={{textAlign: "justify"}}>Description: <br/>{recipe.description}</Card.Text>
                    <Card.Text style={{textAlign: "justify"}} className="preserve-newline">
                    Ingredients: <br/><span>{recipe.ingredients}</span>
                    </Card.Text>
                    <Card.Text style={{textAlign: "justify"}} className="preserve-newline">
                      Instructions: <br/><span>{recipe.instructions}</span>
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
              <EditRecipe
                recipeId={recipeId}
                toggleForm={toggleEditRecipeForm}
              />
            )
          ) : (
            <CopyEditRecipe
              recipeId={recipeId}
              toggleForm={toggleCopyEditRecipeForm}
            />
          )}
          {!(showCopyEditRecipeForm || showEditRecipeForm) && (
            <div>
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
                  <div className="text-center">
                    <h2>Reviews</h2>
                    {recipeReviews.length ? (
                      <div>
                        {!showEditReviewForm ? (
                          <>
                            {recipeReviews.map((review) => (
                              <Card key={review._id} className="my-3">
                                <Card.Body>
                                  <Card.Title>
                                    <img
                                      src={review.author.image} // Add profile image source
                                      alt={`${review.author.name}'s profile`}
                                      style={{ width: "50px" }}
                                      className="profile-image"
                                    />{" "}
                                    <Link to={`/profile/${review.author._id}`}>
                                      {review.author.name}
                                    </Link>
                                  </Card.Title>
                                  <Card.Subtitle>
                                    {"⭐".repeat(review.rating)} {review.title}
                                  </Card.Subtitle>
                                  <Card.Text className="preserve-newline">{review.comment}</Card.Text>
                                  {userHasReview && (
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        toggleEditReviewForm(review._id)
                                      }
                                    >
                                      Edit
                                    </Button>
                                  )}
                                </Card.Body>
                              </Card>
                            ))}
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
                      <p>No Reviews</p>
                    )}
                  </div>
                </>
              ) : (
                <CreateReview
                  recipeId={recipe._id}
                  toggleForm={toggleCreateReviewForm}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};
export default RecipeDetailsPage;
