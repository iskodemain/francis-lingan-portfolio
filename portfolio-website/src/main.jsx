import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProfileContextProvider from './context/ProfileContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProfileContextProvider>
      <App />
    </ProfileContextProvider>
  </BrowserRouter>
)
