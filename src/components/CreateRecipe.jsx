import React, { useContext, useState } from "react";
import { post } from "../services/authService";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import { uploadImg } from "../services/uploadService";
import { RecipesContext } from "../context/recipes.context";

const CreateRecipe = () => {
  const [createNewRecipe, setCreateNewRecipe] = useState({
    name: "",
    category: "",
    description: "",
    ingredients: "",
    instructions: "",
  });
  const [file, setFile] = useState(null);
  const { authenticateUser, storeToken } = useContext(AuthContext);
  const { setNewRecipe } = useContext(RecipesContext);
  const handleTextChange = (e) => {
    setCreateNewRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      uploadImg(file).then((response) => {
        post("/recipes/create", { ...createNewRecipe, image: response.data.fileUrl })
          .then((response) => {
            console.log(response.data);
            storeToken(response.data.authToken);
            authenticateUser();
            setNewRecipe(true);
            window.location.reload(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      post("/recipes/create", createNewRecipe)
        .then((response) => {
          console.log(response.data);
          storeToken(response.data.authToken);
          authenticateUser();
          setNewRecipe(true);
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">New Recipe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 text-center">
          <Form.Label className="form-label">Image</Form.Label>
          <div className="row justify-content-center">
            <div className="col-3">
              <Form.Control
                className="form-control text-center"
                name="image"
                type="file"
                onChange={handleFile}
              />
            </div>
          </div>
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <Form.Label>Name:</Form.Label>
          <div className="row justify-content-center">
            <div className="col-3">
              <Form.Control
                className="form-control text-center"
                name="name"
                type="text"
                value={createNewRecipe.name}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Form.Label>Category:</Form.Label>
          <div className="row justify-content-center">
            <div className="col-3">
              <Form.Select
                name="category"
                onChange={handleTextChange}
                value={createNewRecipe.category}
              >
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
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Form.Label>Description:</Form.Label>
          <div className="row justify-content-center">
            <div className="col-3">
              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                type="text"
                value={createNewRecipe.description}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Form.Label>Ingredients:</Form.Label>
          <div className="row justify-content-center">
            <div className="col-3">
              <Form.Control
                as="textarea"
                rows={5}
                name="ingredients"
                type="text"
                value={createNewRecipe.ingredients}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Form.Label>Instructions:</Form.Label>
          <div className="row justify-content-center">
            <div className="col-3">
              <Form.Control
                as="textarea"
                rows={5}
                name="instructions"
                type="text"
                value={createNewRecipe.instructions}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateRecipe;
