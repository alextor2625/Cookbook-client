import { useContext, useEffect, useState } from "react";
import { RecipesContext } from "../context/recipes.context";
import { Link, useParams } from "react-router-dom";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
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
      setNewCookbook(true)
      // window.location.reload(false);
    });
  };
  useEffect(() => {
    // console.log(cookbooks);
    const ckbk = cookbooks.find((cookbook) => cookbookId == cookbook._id);
    if (ckbk) {
      setCookbook(ckbk);
    }
  }, [cookbooks, recipes, cookbookId]);

  return (
    <div>
      <Row>
        {cookbook ? (
          <>
            <h1 style={{ textAlign: "center" }}>{cookbook.name}</h1>
            {cookbook.recipes.length ? (
              cookbook.recipes.map((recipe) => {
                return (
                  <Col key={recipe._id} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ width: "15rem", margin: "10px" }}>
                      <Card.Img
                        variant="top"
                        src={recipe.image}
                        style={{ width: "10em" }}
                        className="center-image"
                      />
                      <Card.Body className="d-flex flex-column">
                        <Button onClick={() => handleRemoveFromCookbook(recipe._id)}> Remove </Button>
                        <Card.Title>Name: {recipe.name}</Card.Title>
                        <Card.Text>Category: {recipe.category}</Card.Text>
                        <Card.Text>Description: {recipe.description}</Card.Text>
                        {recipe.author._id == recipe.alteredBy ? (
                          <Card.Text>
                            Created By: {recipe.author.name}
                          </Card.Text>
                        ) : (
                          <Card.Text>
                            Last Edited By:{recipe.alteredBy.name}
                          </Card.Text>
                        )}
                        <div className="mt-auto text-center">
                          <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                            <Button variant="primary">Details</Button>
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div style={{ textAlign: "center" }}>
                <h1>
                  <strong>No Recipes</strong>
                </h1>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <MySpinner />
          </div>
        )}
      </Row>
    </div>
  );
};

export default CookbookDetailsPage;
