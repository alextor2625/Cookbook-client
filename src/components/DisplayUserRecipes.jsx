import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UsersContext } from "../context/users.context";

const DisplayUserRecipes = ({ userId }) => {
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(users.find((usr) => userId == usr._id));
  }, [users, user]);
  return (
    <>
      {user && (
        <Row>
          {user.recipes.length ? (
            user.recipes.map((recipe) => {
              return (
                
                <Col key={recipe._id} xs={12} sm={6} md={4} lg={3}>
                  <Card  style={{ width: "15rem", margin: "10px"}}>
                    <Card.Img variant="top" src={recipe.image} style={{width: "10em"}} className="center-image"/>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>Name: {recipe.name}</Card.Title>
                      <Card.Text>Category: {recipe.category}</Card.Text>
                      <Card.Text>Description: {recipe.description}</Card.Text>
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
            <div>No Recipes</div>
          )}
        </Row>
      )}
    </>
  );
};

export default DisplayUserRecipes;
