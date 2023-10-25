import { useContext } from "react";
import { UsersContext } from "../context/users.context";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const ExplorePage = () => {
  const { users } = useContext(UsersContext);

  return (
    <div>
      <h1>Explore</h1>
      {users.map((user) => {
        return (
          <Card style={{ width: "25rem" }} name="profile">
            <Card.Img variant="top" src={user.image} />
            <Card.Body>
              <Card.Title>Name: {user.name}</Card.Title>
            </Card.Body>
            <Link key={user._id} to={`/profile/${user._id}`}>
              <Button variant="primary">Details</Button>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default ExplorePage;
