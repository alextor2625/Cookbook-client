import { createContext, useEffect, useState } from "react";
import { get } from "../services/authService";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState(false);

  useEffect(() => {
    get("/users/profiles")
      .then((response) => {
        console.log("Users Context Response Data", response.data);
        setNewUsers(false)
        setUsers(response.data);
      })
      .catch((err) => {
        console.log("Error getting User Data In Context", err);
      });
  }, [newUsers]);
  return (
    <UsersContext.Provider value={{ users, setUsers, setNewUsers }}>
        {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };

/*\

\*/
