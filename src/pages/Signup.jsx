import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { UsersContext } from '../context/users.context'


import { post } from "../services/authService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { authenticateUser, storeToken } = useContext(AuthContext);
  const { setNewUser} = useContext(UsersContext);

  const navigate = useNavigate();

  const handleInput = (e) => {
    switch (e.target.name) {
      case "name":
        // console.log(e.target.name);
        setName(e.target.value);
        break;
      case "email":
        // console.log(e.target.name);
        setEmail(e.target.value);
        break;
      case "password":
        // console.log(e.target.name);
        setPassword(e.target.value);
        break;
      case "file":
        // console.log(e.target.name);
        setFile(e.target.files[0]);
        break;
      default:
        console.log("ERROR",e.target.name);
    }
  };



  

  const handleUpload = () => {
    const uploadData = new FormData();
    uploadData.append("image", file);
    post("/upload/image", uploadData)
    .then(response =>{
        console.log("Image");
        setImage(response.data.fileUrl)
    })
    .catch ((error) => {
        console.log(error);
      })
  }
  

  const handleSignupSubmit = (e) => {
      e.preventDefault();
      let requestBody;
    
      if (file) {
        handleUpload();
        requestBody = { email, password, name, image };
      } else {
        requestBody = { email, password, name };
      }
      post(`/auth/signup`, requestBody)
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
          setNewUser(true)
          navigate("/profile");
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }


//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     // Create an object representing the request body
//     const imgUrl = handleUpload();
//     let requestBody;
//     if (imgUrl) {
//       requestBody = { email, password, name, image: imgUrl };
//     } else {
//       requestBody = { email, password, name };
//     }

//     // Make an axios request to the API
//     // If the POST request is a successful redirect to the login page
//     // If the request resolves with an error, set the error message in the state
//     post("/auth/signup", requestBody)
//       .then((response) => {
//         console.log("Created user ===>", response.data);
//         storeToken(response.data.authToken);
//         authenticateUser();
//         navigate("/profile");
//       })
//       .catch((error) => {
//         const errorDescription = error.response.data.message;
//         setErrorMessage(errorDescription);
//       });

    
//   };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleInput} />

        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleInput} />
       
        <label>Profile Image:</label>
        <input type="file" name="file" onChange={handleInput} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInput}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to="/login"> Login</Link>
    </div>
  );
};

export default Signup;
