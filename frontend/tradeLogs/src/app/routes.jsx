import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Trades from '../features/trades/Trades.page'
import Stats from '../features/stats/Stats'

export const routes = () => {
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