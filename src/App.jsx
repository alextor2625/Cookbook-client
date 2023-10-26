import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ExplorePage from "./pages/ExplorePage";
import BrowseRecipesPage from "./pages/BrowseRecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import CookbookDetailsPage from "./pages/CookbookDetailsPage";
function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse/recipes" element={<BrowseRecipesPage />} />
        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedIn />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/cookbook/:cookbookId" element={<CookbookDetailsPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />} />
          <Route path="/profile/:profileId" element={<UserDetailsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
