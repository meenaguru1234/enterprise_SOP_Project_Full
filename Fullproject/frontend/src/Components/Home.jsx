import React , {useState} from 'react'
import "../CSS/home.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { LuUpload } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';


const Home = () => {

  const[title, setTitle] = useState("")
  const[file, setfile] = useState(null)
  const [allimage, setAllimage] = useState(null)

  const fileinputref = useRef(null)
  const titleinputref = useRef(null)
  useEffect(()=>{
    getPdf()
    // submitpdf()
  },[])
  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files")
    // console.log(result.data);
    setAllimage (result.data.data)
    
  }

  const removeshowpdf =async(id)=>{
    console.log(id);

    await axios.delete(`http://localhost:5000/delete-file/${id}`)
   setAllimage((prev) => prev.filter((item) => item._id !== id));
    
  }

  const submitPdf=async(e)=>{
    e.preventDefault();
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("file", file)
    console.log(title, file);

    const result = await axios.post("http://localhost:5000/upload-files", formdata,{
   
      // headers :{"Content-Type":"multipart/formdata"}
         
    })
     setAllimage((prev) => [
    ...prev,
    {
      _id: result.data._id,  // we will fix this below
      title: title,
      pdf: result.data.fileName,
    },
  ]);
   setTitle("")
   setfile(null)
   fileinputref.current.value = "";
   titleinputref.current.value="";
  }

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
        <button id='btn_logout' onClick={logout}><MdLogout style={{color:"blue"}}/> Logout</button>
      </div>
      
   </div>
<div id='content-outline-container'>
  <div id='upload_area'>
    <div style={{display:'flex', justifyContent:'left', 
      marginTop:'10px', marginLeft:'15px', color:'white',
      border:'1px solid #27262600',
      paddingLeft:'5px',
      width:'80%', 
      fontWeight:'bolder', fontSize:'20px'
      }}> 
     <LuUpload /> &nbsp; Upload SOPs</div>
     

     <div 
     style={{
      border:'3px dashed blue', 
      // background: 'repeating-linear-gradient( to right,black 0px, black 15px, transparent 15px,  transparent 30px' ),
      height: '300px', 
      width:'80%', display:'flex', backgroundColor:"#666363a8",
      justifyContent:'center', marginLeft:'10%', marginTop:'10%',
      borderRadius:'20px'
     }}>
{/* 
      <div id='upload_inner_content'>
        <div style={{color:'white', alignItems:'center', display:'flex',
          justifyContent:'center', marginTop:'15px', border:'1px solid #624ff14e',
          width:'25%', marginLeft:'38%', height:'30%', fontSize:'40px', backgroundColor:'#624ff14e',
          borderRadius:'50px'
        }}><FaRegFileAlt style={{color:'#624ff1'}}/></div>

        <div style={{color:'white', alignItems:'center', placeItems:'center',
          justifyContent:'center', marginTop:'15px'
        }}><p><b>Drag and Drop your PDF</b></p>  
        <p style={{fontSize:'10px', marginTop:'-10px'}}>or click below to continue</p>
        </div>
        
        <div style={{color:'white', alignItems:'center', display:'flex',
          justifyContent:'center', marginTop:'15px'
        }}>
          <button id='btnuploadfile'> <LuUpload /> Select PDF File</button></div>
      </div> */}

<div class="container mt" id='upload_inner_content'>
  
   <div style={{color:'white', alignItems:'center', display:'flex',
          justifyContent:'center', marginTop:'15px', border:'1px solid #624ff14e',
          width:'25%', marginLeft:'38%', height:'20%', fontSize:'30px', backgroundColor:'#624ff14e',
          borderRadius:'50px'
        }}><FaRegFileAlt style={{color:'#624ff1'}}/></div>
    
    <form onSubmit={submitPdf}>
      <div class="mb-3 mt-4" id='formfile' >
 <input 
          type="text" 
          class="form-control" 
          placeholder='title'
          required
            ref={titleinputref}

          style={{width: '100%'}}
          onChange={(e)=>{setTitle(e.target.value)}}
        />

        <input 
          type="file" 
          class="form-control" 
          accept="application/pdf"
          required
          style={{width: '100%'}}
            ref={fileinputref}
          onChange={(e)=>{setfile(e.target.files[0])}}
        />
      </div>
      
     <div>
       <button type="submit"  id='btnuploadfile' > <LuUpload /> upload</button></div>
 
      
    </form> <br/>
      <div className='uploaded'>
        <h4 style={{color:"white"
        }}>Uploaded PDF:</h4>
        <div className='output-div'>
          {allimage && allimage.map((data)=>{
           let { _id, title, pdf } = data;
            return (
              <div className='inner-div' key={_id}>
            <h6 style={{color:"white"}}>Title : {title}</h6>
            <span>
              <button onClick={() => window.open(`http://localhost:5000/files/${pdf}`)}>Show PDF</button> 
              <button onClick={()=>removeshowpdf(_id)}>Remove</button>
            </span>
          </div>
            )
          })}
        </div>




       </div>
  </div>
</div>





   

{/* <div style={{marginTop:'60px', display:'flex', justifyContent:'center' }}>
   <button id='process_btn' style={{color:'white', backgroundColor:'#8a88e8a8', width:'70%', }}> <SiTicktick /> Process Document</button>
</div> */}

     </div>
   
   

     <div id='search_area'>


      

     </div>
</div>























    </div>
  )
}

export default Home