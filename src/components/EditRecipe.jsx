import { useContext, useState } from "react";
import { post } from "../services/authService";
import { Form, Button } from "react-bootstrap";
import { uploadImg } from "../services/uploadService";
import { RecipesContext } from "../context/recipes.context";

const EditRecipe = ({ recipeId, toggleForm }) => {
  const { recipes } = useContext(RecipesContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [file, setFile] = useState(null);
  const [recipeEdit, setRecipeEdit] = useState({
    name: recipes.find((rcp) => recipeId == rcp._id).name,
    category: recipes.find((rcp) => recipeId == rcp._id).category,
    description: recipes.find((rcp) => recipeId == rcp._id).description,
    ingredients: recipes.find((rcp) => recipeId == rcp._id).ingredients,
    instructions: recipes.find((rcp) => recipeId == rcp._id).instructions,
  });
  const handleTextChange = (e) => {
    setRecipeEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      uploadImg(file).then((response) => {
        post(`/recipes/update/${recipeId}`, {
          ...recipeEdit,
          image: response.data.fileUrl,
        })
          .then((response) => {
            console.log(response.data);
            window.location.reload(false);
          })
          .catch((error) => {
            setErrorMessage(error.response.data.message);
          });
      });
    } else {
      post(`/recipes/update/${recipeId}`, recipeEdit)
        .then((response) => {
          console.log(response.data);
          toggleForm();
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Recipe Edit</h1>
      <Form onSubmit={handleSubmit} className="container">
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Recipe Image</Form.Label>
          <Form.Control
            className="form-control"
            name="image"
            type="file"
            onChange={handleFile}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Name: </Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={recipeEdit.name}
            onChange={handleTextChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Category: </Form.Label>
          <Form.Select name="category" type="text" onChange={handleTextChange}>
            <option value={recipeEdit.category} selected disabled>
              {recipeEdit.category}
            </option>
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
          <Form.Label> Description: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="description"
            type="text"
            value={recipeEdit.description}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> ingredients: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="ingredients"
            type="text"
            value={recipeEdit.ingredients}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> instructions: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="instructions"
            type="text"
            value={recipeEdit.instructions}
            onChange={handleTextChange}
          />
        </Form.Group>

        <div className="center">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
      <div className="center">
        <Button variant="primary" onClick={toggleForm}>
          Cancel
        </Button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EditRecipe;
