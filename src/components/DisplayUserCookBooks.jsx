import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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
        <Row>
          {user.cookbooks.length ? (
            user.cookbooks.map((cookbook) => {
              return (
                <Col key={cookbook._id} xs={12} sm={6} md={4} lg={3}>
                  <Card key={cookbook._id} style={{ width: "15rem", margin: "10px"}}>
                    <Card.Img variant="top" src={cookbook.image} style={{width: "10em"}} className="center-image"/>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>Name: {cookbook.name}</Card.Title>
                      <Card.Text>Description Empty For Now</Card.Text>
                      <div className="mt-auto text-center">
                        <Link to={`/cookbook/${cookbook._id}`}>
                          <Button variant="primary">View</Button>
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

export default DisplayUserCookBooks;
