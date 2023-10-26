import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { UsersProvider } from "./context/users.context.jsx";
import { RecipesProvider } from "./context/recipes.context.jsx";
import { ReviewsProvider } from "./context/reviews.context.jsx";
import { CookbooksProvider } from "./context/cookbooks.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <CookbooksProvider>
          <RecipesProvider>
            <ReviewsProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ReviewsProvider>
          </RecipesProvider>
        </CookbooksProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
);
