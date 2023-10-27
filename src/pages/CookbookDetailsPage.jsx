import React, { useContext, useEffect, useState } from "react";
import { RecipesContext } from "../context/recipes.context";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import MySpinner from "../components/MySpinner";
import { CookbooksContext } from "../context/cookbooks.context";
import { del } from "../services/authService";

const CookbookDetailsPage = () => {
  const { cookbookId } = useParams();
  const { recipes } = useContext(RecipesContext);
  const { cookbooks, setNewCookbook } = useContext(CookbooksContext);
  const [cookbook, setCookbook] = useState(null);

  const handleRemoveFromCookbook = (recipeId) => {
    del(`/cookbooks/remove/${cookbookId}/${recipeId}`).then((response) => {
      console.log(response.data);
      setNewCookbook(true);
    });
  };

  useEffect(() => {
    const ckbk = cookbooks.find((cookbook) => cookbookId === cookbook._id);
    if (ckbk) {
      setCookbook(ckbk);
    }
  }, [cookbooks, recipes, cookbookId]);

  return (
    <div>
      {cookbook ? (
        <div>
          <h1 className="text-center">{cookbook.name}</h1>
          {cookbook.recipes.length ? (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {cookbook.recipes.map((recipe) => (
                <Col key={recipe._id}>
                  <Card style={{ width: "15rem" }} className="m-2">
                    <div className="text-center">
                      <Card.Img
                        variant="top"
                        src={recipe.image}
                        style={{ width: "10em" }}
                      />
                    </div>
                    <Card.Body>
                      <div className="text-center">
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveFromCookbook(recipe._id)}
                        >
                          Remove
                        </Button>
                      </div>
                      <Card.Title className="text-center">Name: {recipe.name}</Card.Title>
                      <Card.Text className="text-center">Category: {recipe.category}</Card.Text>
                      <Card.Text className="text-center">Description: {recipe.description}</Card.Text>
                      <Card.Text className="text-center">
                        {recipe.author._id === recipe.alteredBy ? (
                          `Created By: ${recipe.author.name}`
                        ) : (
                          `Last Edited By: ${recipe.alteredBy.name}`
                        )}
                      </Card.Text>
                      <div className="text-center">
                        <Link to={`/recipe/${recipe._id}`}>
                          <Button variant="primary">Details</Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center">
              <h1>
                <strong>No Recipes</strong>
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <MySpinner />
        </div>
      )}
    </div>
  );
};

export default CookbookDetailsPage;
