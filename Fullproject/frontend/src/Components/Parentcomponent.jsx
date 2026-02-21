import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './Home'
// import Login from './Login'
import App from '../App'
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Dashboard from './Dashboard';
import CreateSop from './CreateSop';
import Template from './Template';
import Ask_ai from './Ask_ai';
// import pdfComp from '';

// export const datapassing = createContext(null)

const Parentcomponent = () => {




  return (



   <>

   <BrowserRouter>
    
        <Routes>

            <Route path='/' element={<App/>}/>
            {/* <Route path='/Home' element={<Home/>}/> */}
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/CreateSop' element={<CreateSop/>}/>
            <Route path='/template' element={<Template/>}/>
            <Route path='/askai' element={<Ask_ai/>}/>
            {/* <Route path='/pdfcomp' element={<pdfComp/>} /> */}


        </Routes>
      <ToastContainer />
   </BrowserRouter>
    
   
   </>
  )
}

export default Parentcomponent