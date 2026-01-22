import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import TradesDataProvider from './app/providers/TradesDataProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TradesDataProvider>
    <App />
  </TradesDataProvider>
  </StrictMode>,
)
