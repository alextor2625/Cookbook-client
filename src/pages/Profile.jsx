import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Tab, Tabs } from "react-bootstrap";
import { Form, Link } from "react-router-dom";
import { UsersContext } from "../context/users.context";
import AddRecipe from "../components/AddRecipe";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { users } = useContext(UsersContext);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    category: "",
    author: "",
    alteredBy: "",
    ingredients: "",
    instructions: "",
  });

  const handleTextChange = (e) => {
    console.log(e);
    setNewRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/recipes/create", newRecipe)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <div>
                <h1>Profile</h1>
                <img src={user.image} alt="Profile Image" />
                <div>
                  Name: <span>{user.name}</span>
                </div>
                <div>
                  Email: <span>{user.email}</span>
                </div>
                <div>
                  Total Recipes: <span>{user.recipes?.length}</span>
                </div>
                <div>
                  Total CookBooks: <span>{user.cookbooks?.length}</span>
                </div>
                <div>
                  Total Reviews: <span>{user.reviews?.length}</span>
                </div>
              </div>
            </Tab>
            <Tab eventKey="my-recipes" title="My Recipes">
              {user.recipes.length ? (
                user.recipes.map((recipe) => {
                  return (
                    <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                      <div>
                        <img src={recipe.image} />
                        <div>
                          <span>Name:{recipe.name}</span>
                          <span>Category:{recipe.category}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div>No Recipes</div>
              )}
            </Tab>
            <Tab eventKey="add-recipe" title="➕ Recipe">
                <AddRecipe />
            </Tab>
          </Tabs>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default Profile;
