import './themes.scss'
import './assets/fonts/Roboto/fonts.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Buffer } from 'buffer'

window.Buffer = Buffer

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
