import { useContext } from "react";
import { RecipesContext } from "../context/recipes.context";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import MySpinner from "../components/MySpinner";

const BrowseRecipesPage = () => {
  const { recipes } = useContext(RecipesContext);
  console.log(recipes);

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Browse Recipes</h1>
      <Row>
        {recipes.length ? (
          recipes.map((recipe) => {
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
                    <Card.Title>Name: {recipe.name}</Card.Title>
                    <Card.Text>Category:{recipe.category}</Card.Text>
                    <Card.Text>Description Empty For Now</Card.Text>
                    {recipe.author._id == recipe.alteredBy._id ? (
                      <Card.Text>Created By:{recipe.author.name}</Card.Text>
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
            <MySpinner />
          </div>
        )}
      </Row>
    </div>
  );
};

export default BrowseRecipesPage;
