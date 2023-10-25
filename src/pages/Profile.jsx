import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Card, Spinner, Tab, Tabs } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { UsersContext } from "../context/users.context";
import CreateRecipe from "../components/CreateRecipe";
import CreateCookBook from "../components/CreateCookBook";
import EditUser from "../components/EditUser";
import DisplayUserRecipes from "../components/DisplayUserRecipes";
import DisplayUserCookBooks from "../components/DisplayUserCookBooks";
import DisplayUser from './../components/DisplayUser';
import MySpinner from "../components/MySpinner";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileEdit, setProfileEdit] = useState(false);

  const handleEditProfile = () => {
    if (profileEdit) {
      setProfileEdit(false);
    } else {
      setProfileEdit(true);
    }
  };
  return (
    <div>
      {user ? (
        <div>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="Profile">
              {!profileEdit ? (
                <DisplayUser userId={user._id} handleEditProfile={handleEditProfile}/>
              ) : (
                <EditUser handleEditProfile={handleEditProfile} />
              )}
            </Tab>
            <Tab eventKey="my-recipes" title="My Recipes">
              <DisplayUserRecipes userId={user._id} />
            </Tab>
            <Tab eventKey="my-cookbooks" title="My CookBooks">
              <DisplayUserCookBooks userId={user._id} />
            </Tab>
            <Tab eventKey="create-recipe" title="➕ Recipe">
              <CreateRecipe />
            </Tab>
            <Tab eventKey="create-cookbook" title="➕ CookBook">
              <CreateCookBook />
            </Tab>
          </Tabs>
        </div>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default Profile;
