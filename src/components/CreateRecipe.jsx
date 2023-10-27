import { useContext, useState } from "react";
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
            setNewRecipe(true)
            // window.location.reload(false);
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
          setNewRecipe(true)
          // window.location.reload(false);

        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            onChange={handleFile}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Name: </Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={createNewRecipe.name}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category: </Form.Label>
          <Form.Select name="category" onChange={handleTextChange}>
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
          <Form.Label> Description: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="description"
            type="text"
            value={createNewRecipe.description}
            onChange={handleTextChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Ingredients: </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="ingredients"
            type="text"
            value={createNewRecipe.ingredients}
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
            value={createNewRecipe.instructions}
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

export default CreateRecipe;
