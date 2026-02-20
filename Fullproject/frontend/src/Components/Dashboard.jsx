import React, { useEffect, useRef, useState } from 'react'
import "../CSS/Dashboard.css"
// import "../CSS/home.css"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { LuUpload } from "react-icons/lu";
import authAxios from 'axios';
import { FaEye } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { Bounce, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = () => {


     const[title, setTitle] = useState("");
  const[file, setfile] = useState("");

  // const [userobj, setuserobj]=useState({
  //   title:"",
  //   file:""
  // })
  const [allimage, setAllimage] = useState([])
const [ref, setref] = useState(true)
  const fileinputref = useRef(null)
  const titleinputref = useRef(null)


  const getPdf = async () => {
   try {
     const result = await authAxios.get("http://localhost:5000/get-files")
    console.log(result.data);
    setAllimage (result.data.data)
   } catch (error) {
    console.log(error);
    
    
   }
    
  }
   useEffect(()=>{
    getPdf()
   
  },[ref])

  const removeshowpdf =async(id)=>{
    console.log(id);

    await authAxios.delete(`http://localhost:5000/delete-file/${id}`)
      .then((res)=>{
    // console.log(res.data.msg);
      setref(!ref)
                    toast(`${ res.data.message}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          }) .catch((err)=>{
    toast.error(` ${err}!`, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
  })
  }

  const UploadPdf = async (e) => {
    e.preventDefault();
    const formdata = new FormData()
    formdata.append("title", title)
    formdata.append("file", file)
    console.log(title, file);



      const result = await authAxios.post(
      "http://localhost:5000/upload-files", 
      formdata,
      {
   
      headers :{"Content-Type":"multipart/form-data"}
      
    })

    console.log(result.data.status);

    if(result.data.status === "ok"){
      // alert("Uploaded successfully")
      toast('🦄 Uploaded successfully', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
      setref(!ref)
    }
    

// setref(!ref)
setTitle("")
   setfile(null)
 fileinputref.current.value = "";
   titleinputref.current.value="";
// setuserobj({...userobj, title:"", file:""})
  };
   
   



  let navigate = useNavigate()

const logout = ()=>{
  navigate("/")
}




  return (
<div>

 <div id='top_container'>
       <p >
        <b style={{color:"blueviolet", fontSize:'50px', display:'flex', justifyContent:'center'}}>OpsMind AI </b>
        
        <b style={{color:"#87c0e472", fontSize:'20px',display:'flex', justifyContent:'center' }}>Enterprise SOP Agent</b>
        </p> <br/>
      
     </div> 
   
  <div id='menu_bar'>

<div id='leftside-navbar1'>
     <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary " >
      <Container>
        <Navbar.Brand as={Link} to="/Dashboard" style={{color:'white'}}>Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <NavDropdown title="HR SOPs" id="collapsible-nav-dropdown"
//              show={hrOpen}
//   onMouseEnter={() => setHrOpen(true)}
//   onMouseLeave={() => setHrOpen(false)}
  >
              <NavDropdown.Item href="#action/3.1">Employee Onboarding Process</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"> Leave Application Procedure </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Payroll Processing Steps</NavDropdown.Item>
              </NavDropdown>

             <NavDropdown title="IT SOPs" id="collapsible-nav-dropdown"   
//              show={itOpen}
//   onMouseEnter={() => setItOpen(true)}
//   onMouseLeave={() => setItOpen(false)}
  >
              <NavDropdown.Item href="#action/3.1">System Access Request</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Password Reset Process</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Software Installation Guide</NavDropdown.Item>
             </NavDropdown>

             <NavDropdown title="Operations SOPs" id="collapsible-nav-dropdown"  
//               show={opOpen}
//   onMouseEnter={() => setOpOpen(true)}
//   onMouseLeave={() => setOpOpen(false)}
  >
              <NavDropdown.Item href="#action/3.1">Daily Task Checklist</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Client Communication Process</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Escalation Procedure</NavDropdown.Item>
             </NavDropdown>

             <NavDropdown title="Finance SOPs" id="collapsible-nav-dropdown"
//               show={finOpen}
//   onMouseEnter={() => setFinOpen(true)}
//   onMouseLeave={() => setFinOpen(false)}
  >
              <NavDropdown.Item href="#action/3.1">Invoice Generation</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"> Expense Reimbursement</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Budget Approval Process</NavDropdown.Item>
             </NavDropdown>

            
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>


     <div id='rightside_navbar1'>
           <button id='btn_logout1' onClick={logout}><MdLogout /> Logout</button>
       
</div>
    
      
   </div>
  
<div id='content-container1'>

<div id='header'
 style={{
    // border:'1px solid white', 
    margin:'10px',
    padding:'10px',
    height:'10%'


}}>
        <h3>Dashboard</h3>

        <h6>Manage SOPs Overview</h6>
</div>   <br/>
    

        <div id='upload_area1' style={{height:'100vh', backgroundColor:'#000', width: '90%', margin:'20px' , marginTop:'-20px'}}>

            
        <div style={{display:'flex', justifyContent:'left', 
         marginLeft:'15px', color:'white',
          border:'1px solid #27262600',
          paddingLeft:'5px', height:'50px',
          width:'80%', 
          fontWeight:'bolder', fontSize:'20px'
          }}>
        
         <div style={{ padding:'20px'}}>
            <LuUpload /> &nbsp; Upload SOPs</div>
         </div>

          <div  style={{
          border:'3px dashed blue', 
          height: '250px', 
          width:'60%', display:'flex', backgroundColor:"#666363a8",
          justifyContent:'center', marginLeft:'10%', borderRadius:'20px',
          marginTop:'5px'
         }}>

            <div class="container mt" id='upload_inner_content1'>

               <form onSubmit={UploadPdf} style={{display:'flex', justifyContent:'center', 
                 height:'100%', width: '90%'
                }}>
          <div  id='formfile' style={{marginTop:'20px', marginLeft:'4px'}} >
            <input 
              type="text" 
              // name='title'
              class="form-control" 
              placeholder='Give the Title for the File'
              required
                ref={titleinputref}
              //  value={userobj.title}
              style={{width: '100%'}}
              onChange={(e)=> setTitle(e.target.value)}
            />
            <br/>
    
            <input 
              type="file" 
              // n  ame='file'
              class="form-control" 
              accept="application/pdf"
              required
              style={{width: '100%'}}
                            //  value={userobj.file}
  ref={fileinputref}
              onChange={(e)=>setfile(e.target.files[0])}
            /> <br/>
             <div>
           <button type="submit"  id='btnuploadfile' > <LuUpload /> Upload Files</button></div>
     
          </div>
          
        
          
        </form> <br/>

        <br/>
          <div className='uploaded' style={{display:'block', justifyContent:'flex-start'}}>
            <h6 style={{color:"white", textAlign:"center", textDecoration:'underline'
            }}>Uploaded PDF:</h6>
             <div className='output-div'>
                {allimage.length ==0 ?   <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading... No file founded </span>
    </Spinner> : allimage.map((data)=>{
               let { _id, title, pdf } = data;
                return (
                  <div className='inner-div' key={_id} style={{
                    display:'flex', justifyContent:'space-evenly'
                  }}>
               <div> <h6 style={{color:"white"}}>Title : {title}</h6>
                <h6 style={{color:"white"}}>File : {pdf}</h6>
                <hr style={{border:'1px solid white', width:'300px'}}/>
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
    
            </div>

          </div>

           

        </div>




</div>
  


</div> 

</div>
 )

}
export default Dashboard;