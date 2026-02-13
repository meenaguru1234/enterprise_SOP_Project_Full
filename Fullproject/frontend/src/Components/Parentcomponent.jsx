import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './Home'
// import Login from './Login'
import App from '../App'
import { ToastContainer } from 'react-toastify';
import Home from './Home';

// export const datapassing = createContext(null)

const Parentcomponent = () => {




  return (



   <>

   <BrowserRouter>
    
        <Routes>

            <Route path='/' element={<App/>}/>
            <Route path='/Home' element={<Home/>}/>

        </Routes>
      <ToastContainer />
   </BrowserRouter>
    
   
   </>
  )
}

export default Parentcomponent