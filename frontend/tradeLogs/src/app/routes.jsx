import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Trades from '../features/trades/Trades.page'
import Strategy from '../features/strategy/Strategy.page'

export const routes = () => {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
              <Route path="/trades" element={<Trades />}/>
              <Route path="/strategy" element={<Strategy />}/>
            </Route>
          </Routes>
        </Router>
    </>
  )
}