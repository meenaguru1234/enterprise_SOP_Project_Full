import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './Home'
// import Login from './Login'
import App from '../App'
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Dashboard from './Dashboard';

// export const datapassing = createContext(null)

const Parentcomponent = () => {




  return (



   <>

   <BrowserRouter>
    
        <Routes>

            <Route path='/' element={<App/>}/>
            <Route path='/Home' element={<Home/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>


        </Routes>
      <ToastContainer />
   </BrowserRouter>
    
   
   </>
  )
}

export default Parentcomponent