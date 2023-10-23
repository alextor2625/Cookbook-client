import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import ExplorePage from './pages/ExplorePage'
import BrowseRecipesPage from './pages/BrowseRecipesPage'
import RecipeDetailsPage from './pages/RecipeDetailsPage'
import UserDetailsPage from './pages/UserDetailsPage';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/recipe/:recipeId' element={<RecipeDetailsPage />}/>
        <Route path='/explore' element={<ExplorePage />}/>
        <Route path='/profile/:profileId' element={<UserDetailsPage />}/>
        <Route path='/browse/recipes' element={<BrowseRecipesPage />}/>
      </Routes>
    </div>
  )
}

export default App
