import { createContext, useEffect, useState } from "react";
import { get } from "../services/authService";

const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState(false);

  useEffect(() => {
    get("/recipes/all")
      .then((response) => {
        console.log("Recipes Context Response Data", response.data);
        setNewRecipe(false)
        setRecipes(response.data);
      })
      .catch((err) => {
        console.log("Error getting Recipes Data In Context", err);
      });
  }, [newRecipe]);
  return (
    <RecipesContext.Provider value={{ recipes, setRecipes, setNewRecipe }}>
        {children}
    </RecipesContext.Provider>
  );
};

export { RecipesContext, RecipesProvider };