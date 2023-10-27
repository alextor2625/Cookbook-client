import { createContext, useEffect, useState } from "react";
import { get } from "../services/authService";

const CookbooksContext = createContext();

const CookbooksProvider = ({ children }) => {
  const [cookbooks, setCookbooks] = useState([]);
  const [newCookbook, setNewCookbook] = useState(false);

  useEffect(() => {
    get("/cookbooks/all")
      .then((response) => {
        console.log("Cookbooks Context Response Data", response.data);
        setNewCookbook(false);
        setCookbooks(response.data);
      })
      .catch((err) => {
        console.log("Error getting Cookbooks Data In Context", err);
      });
  }, [newCookbook]);
  return (
    <CookbooksContext.Provider value={{ cookbooks, setCookbooks, setNewCookbook }}>
      {children}
    </CookbooksContext.Provider>
  );
};

export { CookbooksContext, CookbooksProvider };
