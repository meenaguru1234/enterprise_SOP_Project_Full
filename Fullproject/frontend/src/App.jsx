import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import { authAxios } from './Authaxios/Auth';
import { Bounce, toast } from 'react-toastify';
// import { castObject } from '../../Backend/Controller/middleware/Loginschema';

function App() {


  const navigate = useNavigate()


   const [loginobj, setloginobj] = useState({
    username: "",
    password: ""
  })
  // const [error, setError] = useState('');


  function handleChange(data, value){
    //  console.log(data, value);
      if (!value) {
    alert("Please fill all the fields");
    return;
  }
  if (data === "username") {
    setloginobj({ ...loginobj, username: value });
  } else if (data === "password") {
    setloginobj({ ...loginobj, password: value });
  }

    
  }

const handleUpload= async(e)=>{
  e.preventDefault();
console.log(loginobj);
if(loginobj.username ==+ "" || loginobj.password===""){
  alert("please fill the fields")
}else{
  authAxios.post("/loginmethod", loginobj).then((res)=>{
console.log(res);
// alert(res.data.savedata.username)
toast(` ${res.data.msg}`, {
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
navigate("/Home")
  })
  
}

   setloginobj({...loginobj, username:"", password:""})
}




  return (
    
   <div className="App" style={{ display: 'flex', justifyContent: 'center', height:'100vh',  }}>
    <div style={{
        border: "1px solid #b7acac1c", 
        height: '400px', width: '400px',
        backgroundColor: "#b7acac1c",
        marginTop: '10%', borderRadius: '10px', boxShadow: "20px"
      }}>

        <h1 id='h1'>Login</h1>
        <p id='para'>Enter your credentials to access the system</p>
        <br/>

<form onSubmit={handleUpload}>

  <label style={{ marginLeft:'10px', height:'20px', width: '60%'}}> Username</label><br/>

  <input type="text" 
  name="username"
  placeholder='Enter your username'
   value={loginobj.username}
   onChange={(e) => {
     handleChange("username", e.target.value)}}
     />
<br/><br/>

   <label style={{ marginLeft:'10px', height:'20px', width: '60%'}}> Password</label><br/>
  
  <input type="text" 
  name="password"
  placeholder='Enter your password'
  value={loginobj.password}
   onChange={(e) => {
     handleChange("password", e.target.value)}}
     />

<br/><br/>

<button>Sign In</button>

</form>


    </div> <br/>




 





       </div>
     
   
  )
}

export default App
