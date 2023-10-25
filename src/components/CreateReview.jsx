import { useContext, useState } from "react";
import { post } from "../services/authService";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { RecipesContext } from "../context/recipes.context";

const CreateReview = ({ recipeId, toggleForm }) => {
  const { recipes } = useContext(RecipesContext);
  const { authenticateUser, storeToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [newReview, setNewReview] = useState({
    title: "",
    comment: "",
    rating: 0,
  });

  const handleTextChange = (e) => {
    setNewReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipes.find((rcp) => recipeId == rcp._id)) {
      post(`/reviews/create/${recipeId}`, newReview)
        .then((response) => {
          console.log(response.data);
          storeToken(response.data.authToken);
          authenticateUser();
          toggleForm();
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrorMessage("Invalid Recipe Id.");
    }
  };

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Make A Review</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> Title: </Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={newReview.title}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Rating: </Form.Label>
          <Form.Select
            name="rating"
            value={newReview.rating}
            onChange={handleTextChange}
          >
            <option value={0}> </option>
            <option value={1}>{"⭐"}</option>
            <option value={2}>{"⭐".repeat(2)}</option>
            <option value={3}>{"⭐".repeat(3)}</option>
            <option value={4}>{"⭐".repeat(4)}</option>
            <option value={5}>{"⭐".repeat(5)}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Comment: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="comment"
            type="text"
            value={newReview.comment}
            onChange={handleTextChange}
          />
        </Form.Group>
        {errorMessage && <p>{errorMessage}</p>}

        <div className="center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <div className="center">
        <Button variant="primary" onClick={toggleForm}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateReview;
