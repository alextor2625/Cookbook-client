import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { UsersContext } from "../context/users.context";

const DisplayUser = ({ userId, handleEditProfile, variant }) => {
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(users.find((usr) => userId == usr._id));
  }, [users, user, userId]);
  return (
    <>
      {user && (
        <Card style={{ width: "30rem" }} name="profile">
          <Card.Img variant="top" src={user.image} />
          <Card.Body>
            {!variant ? (
              <>
                <Card.Title>Profile</Card.Title>
                <Card.Text>Name: {user.name}</Card.Text>
              </>
            ) : (
              <>
                <Card.Title>{user.name}'s Profile</Card.Title>
              </>
            )}
            <Card.Text>Email: {user.email}</Card.Text>
            <Card.Text>Total Recipes: {user.recipes?.length}</Card.Text>
            <Card.Text>Total CookBooks: {user.cookbooks?.length}</Card.Text>
            <Card.Text>Total Reviews: {user.reviews?.length}</Card.Text>

            {handleEditProfile && (
              <Button variant="primary" onClick={handleEditProfile}>
                Edit
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default DisplayUser;
