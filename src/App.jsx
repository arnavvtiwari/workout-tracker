import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/home/Home'
import Workout from './components/workout/Workout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workout" element={<Workout />} />
        </Routes>
    </>
  )
}

export default App
