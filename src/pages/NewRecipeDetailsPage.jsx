import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RecipesContext } from "../context/recipes.context";
import { UsersContext } from "../context/users.context";
import { ReviewsContext } from "../context/reviews.context";
import { Button, Card, Image, Row } from "react-bootstrap";
import CreateReview from "../components/CreateReview";
import MySpinner from "./../components/MySpinner";
import { AuthContext } from "../context/auth.context";
import { CookbooksContext } from "../context/cookbooks.context";
import EditReview from "./../components/EditReview";
import { del, put } from "../services/authService";
import EditRecipe from "../components/EditRecipe";
import CopyEditRecipe from "../components/CopyEditRecipe";
import AddToCookBook from "../components/AddToCookBook";
const RecipeDetailsPage = () => {
    const { recipeId } = useParams();
    const { recipes } = useContext(RecipesContext);
    const { reviews } = useContext(ReviewsContext);
    const { users } = useContext(UsersContext);
    const { setNewCookbook } = useContext(CookbooksContext);
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
    }, [reviews, recipes, recipeId, users, selectedReviewId, user]);

    return (

        <Container className="mt-5">
            {recipe ?
                (<Row>
                    {!showCopyEditRecipeForm ?
                        (!showEditRecipeForm ?
                            (<>
                                <Col md={6}>
                                    <Image src={recipe.image} fluid />
                                </Col>
                                <Col md={6}>
                                <h2>{recipe.name} Recipe</h2>
                                <p>Category: {recipe.category}</p>
                                <p>Description: {recipe.description}</p>
                                {recipe.author._id == recipe.alteredBy._id && (
                                 <p>
                                    Created By:
                                    <Link to={`/profile/${recipe.author._id}`}>
                                        {recipe.author.name}
                                    </Link>
                                 </p>
                                )}
                                {recipe.author._id != recipe.alteredBy._id && (
                                <p>
                                    Altered By:
                                    <Link to={`/profile/${recipe.alteredBy._id}`}>
                                        {recipe.alteredBy.name}
                                    </Link>
                                </p>
                                )}
                                <p>Ingredients: <span>{recipe.ingredients}</span></p>
                                <p>Instructions: <span>{recipe.instructions}</span></p>
                                </Col>
                            </>)
                                :
                                (<>
                                    {!user.recipes.find((rcp) => recipe._id == rcp._id) ? (
                                      <Button onClick={() => handleAddRecipe(recipeId)}>
                                        Add Recipe
                                      </Button>
                                    ) : (
                                      <Button onClick={() => handleRemoveRecipe(recipeId)}>
                                        Remove Recipe
                                      </Button>
                                    )}
                                </>)
                        ) : (
                            <></>
                            )
                </Row>})
            }

        </Container>


    )


    export default RecipeDetailsPage;