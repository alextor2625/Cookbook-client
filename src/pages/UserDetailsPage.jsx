import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsersContext } from "../context/users.context";
import { Card, Tab, Tabs } from "react-bootstrap";
import Spinner from "../components/MySpinner";
import DisplayUserRecipes from "../components/DisplayUserRecipes";
import DisplayUserCookBooks from "../components/DisplayUserCookBooks";

const UserDetailsPage = () => {
  const { profileId } = useParams();
  const { users } = useContext(UsersContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usr = users.find((usr) => usr._id === profileId);
    if (usr) {
      setUser(usr);
    }
  }, [users, profileId]);
  return (
    <div>
      {user ? (
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="profile" title="Profile">
            <Card style={{ width: "30rem" }} name="profile">
              <Card.Img variant="top" src={user.image} />
              <Card.Body>
                <Card.Title>{user.name}'s Profile</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Total Recipes: {user.recipes?.length}</Card.Text>
                <Card.Text>Total CookBooks: {user.cookbooks?.length}</Card.Text>
                <Card.Text>Total Reviews: {user.reviews?.length}</Card.Text>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="recipes" title="Recipes">
            <DisplayUserRecipes userId={profileId} />
          </Tab>
          {user.cookbooks.length ? (
            <Tab eventKey="cookbooks" title="CookBooks">
              <DisplayUserCookBooks userId={profileId} />
            </Tab>
          ) : (
            <Tab eventKey="cookbooks" title="No CookBooks" disabled>
            </Tab>
          )}
        </Tabs>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default UserDetailsPage;
