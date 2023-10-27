import React, { useContext, useState } from "react";
import { post } from "../services/authService";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { RecipesContext } from "../context/recipes.context";
import { ReviewsContext } from "../context/reviews.context";

const CreateReview = ({ recipeId, toggleForm }) => {
  const { recipes } = useContext(RecipesContext);
  const { setNewReview } = useContext(ReviewsContext);
  const { authenticateUser, storeToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [createNewReview, setCreateNewReview] = useState({
    title: "",
    comment: "",
    rating: 0,
  });

  const handleTextChange = (e) => {
    setCreateNewReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipes.find((rcp) => recipeId == rcp._id)) {
      post(`/reviews/create/${recipeId}`, createNewReview)
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
          // toggleForm();
          setNewReview(true);
          window.location.reload(false)
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
        });
    } else {
      setErrorMessage("Invalid Recipe Id.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto"> {/* Center the Form */}
          <h1 className="text-center">Make A Review</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label> Title: </Form.Label>
              <Form.Control
                name="title"
                type="text"
                value={createNewReview.title}
                onChange={handleTextChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Rating: </Form.Label>
              <Form.Select
                name="rating"
                value={createNewReview.rating}
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
                value={createNewReview.comment}
                onChange={handleTextChange}
              />
            </Form.Group>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="d-flex justify-content-center d-grid gap-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="center d-grid gap-2">
            <Button variant="danger" onClick={toggleForm}>
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateReview;
