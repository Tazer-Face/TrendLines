import { useState } from 'react'
import './App.css'
import { Container } from 'react-bootstrap'
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Trades from './components/Trades'
import Stats from './components/Stats'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route path="/trades" element={<Trades />}/>
              <Route path="/stats" element={<Stats />}/>
            </Route>
          </Routes>
        </Router>
    </>
  )
}

export default App
