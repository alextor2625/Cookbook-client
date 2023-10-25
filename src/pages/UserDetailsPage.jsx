import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsersContext } from "../context/users.context";
import { Card, Tab, Tabs } from "react-bootstrap";
import Spinner from "../components/MySpinner";
import DisplayUserRecipes from "../components/DisplayUserRecipes";
import DisplayUserCookBooks from "../components/DisplayUserCookBooks";
import DisplayUser from "../components/DisplayUser";

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
          <DisplayUser userId={user._id} variant={true}/>
          </Tab>
          {user.recipes.length ?
            <Tab eventKey="recipes" title="Recipes">
            <DisplayUserRecipes userId={profileId} />
          </Tab>:
            <Tab eventKey="recipes" title="No Recipes" disabled>
          </Tab>
          }
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
