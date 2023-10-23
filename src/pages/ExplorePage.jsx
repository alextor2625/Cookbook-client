import { useContext } from "react"
import { UsersContext } from "../context/users.context"
import { Link } from "react-router-dom";

const ExplorePage = () => {
    const {users} = useContext(UsersContext)

  return (
    <div>
      <h1>Explore</h1>
      {users.map((user) => {
        return (
          <Link key={user._id} to={`/profile/${user._id}`}>
          <div >
            <img src={user.image} />
            <div>
              <span>Name: {user.name}</span>
            </div>
          </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ExplorePage