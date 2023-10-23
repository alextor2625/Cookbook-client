import { useContext } from "react"
import { AuthContext } from "../context/auth.context"



const Profile = () => {
    const {user} = useContext(AuthContext)

  return (
    <div>
        <h1>Profile</h1>
        <img src={user.image} alt="Profile Image" />
        <div>Name: <span>{user.name}</span></div>
        <div>Email: <span>{user.email}</span></div>
        <div>Total Recipes: <span>{user.recipes.length}</span></div>
        <div>Total CookBooks: <span>{user.cookbooks.length}</span></div>
        <div>Total Reviews: <span>{user.reviews.length}</span></div>


    </div>
  )
}

export default Profile