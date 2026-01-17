import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import TradesDataProvider from './Context/TradesDataProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TradesDataProvider>
    <App />
  </TradesDataProvider>
  </StrictMode>,
)
