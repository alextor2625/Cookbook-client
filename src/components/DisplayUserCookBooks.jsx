import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UsersContext } from "../context/users.context";

const DisplayUserCookBooks = ({ userId }) => {
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(users.find((usr) => userId == usr._id));
  }, [users, user]);
  return (
    <>
      {user && (
        <>
          {user.cookbooks.length ? (
            user.cookbooks.map((cookbook) => {
              return (
                <Card key={cookbook._id} style={{ width: "30rem" }}>
                  <Card.Img variant="top" src={cookbook.image} />
                  <Card.Body>
                    <Card.Title>Name: {cookbook.name}</Card.Title>
                    <Card.Text>Description Empty For Now</Card.Text>
                    <Link to={`/cookbook/${cookbook._id}`}>
                      <Button variant="primary">View</Button>
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

export default DisplayUserCookBooks;
