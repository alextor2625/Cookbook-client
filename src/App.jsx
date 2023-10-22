import { useState } from 'react'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </div>
  )
}

export default App
