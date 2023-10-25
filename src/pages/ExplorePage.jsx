import { useContext } from "react";
import { UsersContext } from "../context/users.context";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import MySpinner from "../components/MySpinner";

const ExplorePage = () => {
  const { users } = useContext(UsersContext);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Explore</h1>

      <Row>
        {users.length ? (
          <>
            {users.map((user) => {
              return (
                <Col key={user._id} xs={12} sm={6} md={4} lg={3}>
                  <Card style={{ width: "15rem", margin: "10px" }}>
                    <Card.Img
                      variant="top"
                      src={user.image}
                      style={{ height: "10em", width: "10em" }}
                      className="center-image"
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>Name: {user.name}</Card.Title>
                    </Card.Body>
                    <div className="mt-auto text-center">
                      <Link to={`/profile/${user._id}`}>
                        <Button variant="primary">Details</Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              );
            })}
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

export default ExplorePage;
