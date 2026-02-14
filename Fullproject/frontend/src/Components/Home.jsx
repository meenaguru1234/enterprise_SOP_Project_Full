import React from 'react'
import "../CSS/home.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';






const Home = () => {

const navigate = useNavigate()
const logout = ()=>{
  navigate("/")
}

  return (

    <div>

     <div id='top_container'>
       <p >
        <b style={{color:"blueviolet", fontSize:'50px', display:'flex', justifyContent:'center'}}>OpsMind AI </b>
        <br/> 
        <b style={{color:"#87c0e472", fontSize:'20px',display:'flex', justifyContent:'center' }}>Enterprise SOP Agent</b></p> <br/>
      
     </div> 

   <div id='logout_bar'>

     <div id='leftside-navbar'>
    


    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
     

            <NavDropdown title="Dashboard" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">System Overview</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
             Total SOP Document
              </NavDropdown.Item>
             
            </NavDropdown>

            &nbsp; &nbsp; &nbsp;


             <NavDropdown title="Ask OpsMind" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Search SOPs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Recent Questions
              </NavDropdown.Item>
                        </NavDropdown>
            &nbsp; &nbsp; &nbsp;

             <NavDropdown title="Knowledge Base" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">HR SOPs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               Finance SOPs
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">IT SOPs</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item href="#action/3.4">
                Compliance SOPs
              </NavDropdown.Item>
            </NavDropdown>
            &nbsp; &nbsp; &nbsp;

         

         
      </Container>
    </Navbar>



     </div>
      <div id='rightside_navbar'>
        <button id='btn_logout' onClick={logout}>Logout</button>
      </div>
      
   </div>
<div id='content-outline-container'>
  <div id='upload_area'>
     
     </div>

     <div id='search_area'>

     </div>
</div>























    </div>
  )
}

export default Home