import { useState } from "react";
import { post } from "../services/authService";
import { Form, Button } from "react-bootstrap";

const AddRecipePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    category: "",
    author: "",
    alteredBy: "",
    ingredients: "",
    instructions: "",
  });

  const handleTextChange = (e) => {
    setNewRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/recipes/create", newRecipe)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>New Recipe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Recipe Image</Form.Label>
          <Form.Control
            className="form-control"
            name="image"
            type="file"
            onChange={handleTextChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Name: </Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={newRecipe.name}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category: </Form.Label>
          <Form.Select>
            <option value=""></option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Salad">Salad</option>
            <option value="Main-course">Main-course</option>
            <option value="Side-dish">Side-dish</option>
            <option value="Baked-goods">Baked-goods</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Soup">Soup</option>
            <option value="Holiday">Holiday</option>
            <option value="Vegetarian">Vegetarian</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Ingredients: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="ingredients"
            type="text"
            value={newRecipe.ingredients}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Instructions: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="instructions"
            type="text"
            value={newRecipe.instructions}
            onChange={handleTextChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddRecipePage;
