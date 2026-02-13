import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import Parentcomponent from './Components/Parentcomponent.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Parentcomponent />
  </>
)
