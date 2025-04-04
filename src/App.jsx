import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home/Home'
import Workout from './components/workout/Workout'
import Food from './components/food/Food'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/authenticate/Login'
import Registration from './components/authenticate/Registration'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
            <Route path="/" element={<Workout />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/food" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Registration />} />
        </Routes>
    </>
  )
}

export default App
