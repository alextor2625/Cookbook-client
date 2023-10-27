import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Card, Spinner, Tab, Tabs } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { UsersContext } from "../context/users.context";
import CreateRecipe from "../components/CreateRecipe";
import CreateCookBook from "../components/CreateCookBook";
import EditUser from "../components/EditUser";
import DisplayUserRecipes from "../components/DisplayUserRecipes";
import DisplayUserCookBooks from "../components/DisplayUserCookBooks";
import DisplayUser from "./../components/DisplayUser";
import MySpinner from "../components/MySpinner";
// import { del } from "../services/authService";
import { CookbooksContext } from "../context/cookbooks.context";
import { ReviewsContext } from "../context/reviews.context";
import { UsersContext } from "../context/users.context";

const Profile = () => {
  // const { user, setNewUser } = useContext(AuthContext);
  // const { setNewCookbook } = useContext(CookbooksContext);
  const [profileEdit, setProfileEdit] = useState(false);

  const { user } = useContext(AuthContext);
  const { cookbooks } = useContext(CookbooksContext);
  const { reviews } = useContext(ReviewsContext);
  const { users } = useContext(UsersContext);

  // const handleDeleteCookBook = () => {
  //   del(`cookbooks/delete/:cookbookId`)
  //   .then(response=>{
  //     console.log(response);
  //     setNewUser(true)
  //     setNewCookbook(true)
  //   })
  // }
  const handleEditProfile = () => {
    if (profileEdit) {
      setProfileEdit(false);
    } else {
      setProfileEdit(true);
    }
  };

  useEffect(() => {
    console.log("Reloading");
  }, [user, cookbooks, reviews, users]);
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
                <DisplayUser
                  userId={user._id}
                  handleEditProfile={handleEditProfile}
                />
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
