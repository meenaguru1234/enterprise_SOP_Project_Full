const express = require("express")

const app = express()
const mongoose  = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const loginschema = require("./Controller/middleware/Loginschema")
const cors = require("cors")
app.use(cors())
dotenv.config()
app.use(express.json())
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("DB is connected");
    
}).catch(()=>{
    console.log("DB is not connected");
    
})

app.get("/readData", async(req, res)=>{
    

    let dataget = await loginschema.find()
    res.json(dataget)
    
})

app.post("/loginDataCreate", async(req, res)=>{
    // console.log(req.body);
   try{
     let {username, password} = req.body;
    console.log(username, password);

        let hashpassword = await bcrypt.hash(password, 7); 
        // console.log(hashpassword);
        
        let existingusername = await loginschema.findOne({username:username})
        if(existingusername) return res.status(200).json({msg:"username already exist"})

    const data = await new loginschema({
        ...req.body, password:hashpassword


    })
    console.log(data);
    let savedata = await data.save()
    res.status(200).json({"msg":"data reg successfully", savedata})
   }
   catch(err){
    res.status(400).json(err)
   }
    
})


app.post("/loginmethod", async(req,res)=>{
    console.log(req.body);
      let existingusername = await loginschema.findOne({username:req.body.username})
        if(!existingusername) return res.status(200).json({msg:"username not found"})

let checkpassword = await bcrypt.compare(req.body.password, existingusername.password) 
            if(!checkpassword) return res.status(404).json({msg:"password not match"})
                 res.status(200). json({msg:"Login Successfully", existingusername})

})

app.listen(process.env.Port, ()=>{
    console.log(`Server running port on: ${process.env.Port}`);
    
})