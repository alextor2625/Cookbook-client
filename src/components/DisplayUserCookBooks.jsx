import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UsersContext } from "../context/users.context";
import { AuthContext } from "../context/auth.context";
import { CookbooksContext } from "../context/cookbooks.context";
import { del } from "../services/authService";

const DisplayUserCookBooks = ({ userId }) => {
  const { users, setNewUsers } = useContext(UsersContext);
  const { user, setNewUser } = useContext(AuthContext);

  const { setNewCookbook } = useContext(CookbooksContext);
  const handleDeleteCookBook = (cookbookId) => {
    del(`/cookbooks/delete/${cookbookId}`).then((response) => {
      console.log(response);
      setNewUser(true);
      setNewUsers(true);
      setNewCookbook(true);
    });
  };

  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    setSelectedUser(users.find((usr) => userId == usr._id));
  }, [users, user, selectedUser]);

  return (
    <>
      {selectedUser && (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {selectedUser.cookbooks.length ? (
            selectedUser.cookbooks.map((cookbook) => {
              return (
                <Col key={cookbook._id}>
                  <Card className="mb-4">
                    <div className="text-center">
                      <Card.Img
                        variant="top"
                        src={cookbook.image}
                        style={{ width: "10em" }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="text-center">
                        Name: {cookbook.name}
                      </Card.Title>
                      <Card.Text className="text-center">
                        Description: Empty For Now
                      </Card.Text>
                      <div className="text-center">
                        <Link to={`/cookbook/${cookbook._id}`}>
                          <Button variant="primary">View</Button>
                        </Link>
                        {user._id == cookbook.author && (
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteCookBook(cookbook._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <div className="text-center">No Cookbooks</div>
          )}
        </Row>
      )}
    </>
  );
};

export default DisplayUserCookBooks;
