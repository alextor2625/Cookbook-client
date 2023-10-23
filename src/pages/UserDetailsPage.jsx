import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UsersContext } from "../context/users.context"

const UserDetailsPage = () => {
    const {profileId} = useParams()
    const {users} = useContext(UsersContext)
    const [user, setUser] = useState({})
    
    useEffect(() => {
      const usr = users.find((usr) => usr._id === profileId);
      if (usr) {
        setUser(usr);
      }
  }, [users, profileId]);
  return (
    <div>
        <h1>{user.name}'s Profile</h1>
        <img src={user.image} alt="Profile Image" />
        <p>Name: <span>{user.name}</span></p>
        <p>Email: <span>{user.email}</span></p>
    </div>
  )
}

export default UserDetailsPage