import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Parentcomponent from './Components/Parentcomponent.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <Parentcomponent />
  </>
)
