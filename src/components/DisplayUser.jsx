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
    <div className="center">
      {user && (
        <Card style={{ width: "30rem" }}>
          <Card.Img variant="top" src={user.image} style={{width: "20em"}} className="center-image"/>
          <Card.Body>
            {!variant ? (
              <div className="center-card-text">
                <Card.Title>Profile</Card.Title>
                <Card.Text>Name: {user.name}</Card.Text>
              </div>
            ) : (
              <div className="center-card-text">
                <Card.Title>{user.name}'s Profile</Card.Title>
              </div>
            )}
            <div className="center-card-text">
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Total Recipes: {user.recipes?.length}</Card.Text>
              <Card.Text>Total CookBooks: {user.cookbooks?.length}</Card.Text>
              <Card.Text>Total Reviews: {user.reviews?.length}</Card.Text>
  
              {handleEditProfile && (
                <Button variant="primary" onClick={handleEditProfile}>
                  Edit
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default DisplayUser;
