import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { UsersProvider } from "./context/users.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
);
