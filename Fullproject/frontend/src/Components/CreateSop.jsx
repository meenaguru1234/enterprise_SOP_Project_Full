import React, { useState } from 'react'
import "../CSS/Dashboard.css"
import {  useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import {jsPDF} from 'jspdf';
import { FaPlus } from "react-icons/fa";

const CreateSop = () => {


const [showform, setshowform] = useState(false)
const [title, setTitle] = useState("")
const [ description, setDescription] = useState("")

// const [results, setResults] = useState([]);
const [showpdf, setShowpdf] = useState([]);




const createPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 20, 20);

  doc.setFontSize(12);

  const splitText = doc.splitTextToSize(description, 170);
  doc.text(splitText, 20, 40);

  let savedpdf = doc.save(`${title}.pdf`);
  console.log(savedpdf);
  

  // reset form after download
  setTitle("");
  setDescription("");
  setshowform(false);
};



// const removeshowpdf = (id) =>{
//   console.log(id);
  
// }



  let navigate = useNavigate()

const logout = ()=>{
  navigate("/")
}



  return (
    <div>
        
 <div id='menu_bar'>

<div id='leftside-navbar1'>
    <div > <a href="/Dashboard" style={{color:'white', textDecoration:'none', cursor: 'pointer'}}>Dashboard</a></div>
  <div > <a href="/CreateSop" style={{color:'white', textDecoration:'none', cursor: 'pointer'}}>SOPs</a></div>
  <div > <a href="/template" style={{color:'white' , textDecoration:'none', cursor: 'pointer'}} >Templeate</a></div>
  <div > <a href="/askai" style={{color:'white' , textDecoration:'none', cursor: 'pointer'}} >Ask AI</a></div>

    
</div>


     <div id='rightside_navbar1'>
           <button id='btn_logout1' onClick={logout}><MdLogout /> Logout</button>
       
</div>
    
      
   </div>
  
<div id='create-container'>

<div id='header'
 style={{
    // border:'1px solid white', 
    margin:'10px',
    padding:'10px',
    height:'150vh',
     display:'flex', justifyContent:'left'


}}>

      




        <button id='createbtn' onClick={()=>{setshowform(true)}} style={{
            width: '15%',  marginTop:'10px', position:'static'
            // border:'1px solid white'
        }}>
            <FaPlus /> Create SOP</button>

        

       {
            showform && (
                 <form action="">
                    <div className="sop-form" style={{height:'90vh', backgroundColor:'#000', 
        width: '90%', margin:'20px' , marginTop:'100px'}}>

    <div style={{
        // border:'1px solid white',
        padding:'30px'
        }}>
            <span>
                <label style={{border:'1px solid black', marginLeft:'55px'}}>Title : </label>
       
          
                 <input
     type="text" 
              name='title'
              class="form-control" 
              placeholder='Give the Title for the pdf'
              required
                // ref={titleinputref}
              //  value={userobj.title}
              style={{width: '50%', marginLeft:'120px', marginTop:'-30px'}}
      onChange={(e)=>setTitle(e.target.value)}
    /> <p style={{
        fontSize:'14px', color:'white', marginLeft:'120px'
    }}>example: "IT, HR, Finance, Operation and etc.,"</p>
            </span>
<br/><br/>

 
            <span>
<label style={{}}>Description : </label>
    <textarea
      placeholder="Enter Description in 1000 words"
      value={description}
      style={{width:'50%', marginLeft:'30px', borderRadius:'7px', height:'200px'}}
      onChange={(e)=>setDescription(e.target.value)}
    />
     </span>
     <br/><br/>

    <button id='createpdf-btn' onClick={createPDF} style={{
        width:'20%', marginLeft:'30%'
    }}>Create PDF</button>
</div>
  </div>
                 </form>
            )
        }
    
 {/* <div className='CreatedFiles' style={{display:'block', justifyContent:'flex-start'}}>
            <h6 style={{color:"white", textAlign:"center", textDecoration:'underline'
            }}>Created PDF:</h6>
             <div className='createdpdf-div'>
                {showpdf.length ==0 ?   <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading... No file founded </span>
    </Spinner> : showpdf.map((data)=>{
               let {_id, title} = data
                return (
                  <div className='inner-div' key={_id} style={{
                    display:'flex', justifyContent:'space-evenly'
                  }}>
               <div> <h6 style={{color:"white"}}>Title : {title}</h6>
                  </div>
                

                <div style={{
                  display:'flex', justifyContent:'space-evenly'
                }}>
                  
                  <div>
                  <button id='showpdf' onClick={() => window.open(`http://localhost:5000/files/${pdf}`)}><FaEye /></button> 
                 </div>                  
 <div>
    <button id='removebtn' onClick={()=>removeshowpdf(_id)}><IoMdRemoveCircleOutline /></button>
               
    </div>  
                </div>
              </div>
            );
          }
        )}
            </div>
            </div>   */}
      
        </div>   <br/>
    

      

         
         </div>

         




</div>
  


// </div> 



//     </div>
  )
}

export default CreateSop