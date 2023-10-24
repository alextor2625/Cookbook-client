import { useContext } from "react";
import { RecipesContext } from "../context/recipes.context";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const BrowseRecipesPage = () => {
  const { recipes } = useContext(RecipesContext);
  console.log(recipes);

  return (
    <div>
      <h1>Browse Recipes</h1>
      {recipes.map((recipe) => {
        return (
            <Card key={recipe._id} style={{ width: "30rem" }}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title>Name: {recipe.name}</Card.Title>
                <Card.Text>Category:{recipe.category}</Card.Text>
                <Card.Text>Description Empty For Now</Card.Text>
                {recipe.author._id == recipe.alteredBy._id ? (
                  <Card.Text>Created By:{recipe.author.name}</Card.Text>
                ) : (
                  <Card.Text>Last Edited By:{recipe.alteredBy.name}</Card.Text>
                )}
                <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                  <Button variant="primary">Details</Button>
                </Link>
              </Card.Body>
            </Card>

        );
      })}
    </div>
  );
};

export default BrowseRecipesPage;
