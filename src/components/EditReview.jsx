import { useContext, useEffect, useState } from "react";
import { post } from "../services/authService";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { ReviewsContext } from "../context/reviews.context";

const EditReview = ({ reviewId, toggleForm }) => {
  const { reviews } = useContext(ReviewsContext);
  const { authenticateUser, storeToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [editReview, setEditReview] = useState({
    title: "",
    comment: "",
    rating: 0,
  });
  const handleTextChange = (e) => {
    setEditReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviews.find((rvw) => reviewId == rvw._id)) {
      post(`/reviews/update/${reviewId}`, editReview)
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
      setErrorMessage("Invalid Review Id.");
    }
  };

  return (
    <div>
      <h1>Edit Review</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> Title: </Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={editReview.title}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Rating: </Form.Label>
          <Form.Select
            name="rating"
            value={editReview.rating}
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
            value={editReview.comment}
            onChange={handleTextChange}
          />
        </Form.Group>
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Button variant="primary" onClick={toggleForm}>
        Cancel
      </Button>
    </div>
  );
};

export default EditReview;
