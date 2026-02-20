import React from 'react'
import "../CSS/template.css"
import { useNavigate } from 'react-router-dom'

const Template = () => {


 let navigate = useNavigate()

const goback = ()=>{
  navigate("/Dashboard")
}


  return (

    <div>

        <div>
            <p >
        <b style={{color:"blueviolet", fontSize:'50px', display:'flex', justifyContent:'center'}}>Sample Templates </b>
        
        <b id='backid' style={{color:"#87c0e472", fontSize:'20px',display:'flex', justifyContent:'right' }} onClick={goback}>back</b>
        </p> <br/>
        </div>
        
    
        <div class="img-grid">
  <img id='img1' />
  <img id='img2' />
  <img id='img3' />
  <img id='img4' />
  <img id='img5' />
  <img id='img6' />
        </div>
    


    </div>
  )
}

export default Template