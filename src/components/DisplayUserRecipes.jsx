import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
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
        <>
          {user.recipes.length ? (
            user.recipes.map((recipe) => {
              return (
                <Card key={recipe._id} style={{ width: "30rem" }}>
                  <Card.Img variant="top" src={recipe.image} />
                  <Card.Body>
                    <Card.Title>Name: {recipe.name}</Card.Title>
                    <Card.Text>Category:{recipe.category}</Card.Text>
                    <Card.Text>Description: {recipe.description}</Card.Text>
                    <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                      <Button variant="primary">Details</Button>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>No Recipes</div>
          )}
        </>
      )}
    </>
  );
};

export default DisplayUserRecipes;
