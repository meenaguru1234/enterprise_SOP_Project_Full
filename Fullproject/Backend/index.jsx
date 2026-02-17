const express = require("express")

const app = express()
const mongoose  = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const loginschema = require("./Controller/middleware/Loginschema")
const cors = require("cors")
const openai = require("openai")

app.use("/files", express.static("files"))
app.use(cors())
dotenv.config()
app.use(express.json())
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("DB is connected");
    
}).catch(()=>{
    console.log("DB is not connected");
    
})




//OPEN AI API key

const client = new openai.OpenAI({

    apiKey: process.env.OPENAI_API_KEY
})

//multer


const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null, uniqueSuffix + file.originalname)
  }
})
const upload = multer({ storage: storage })

const Pdfschema = require("./Controller/middleware/Pdfschema")


app.post("/upload-files", upload.single("file"), async(req,res)=>{
    console.log(req.file);
// res.json("hi")
const title = req.body.title;
const fileName = req.file.filename;
console.log(fileName, title);

try {
    
await Pdfschema.create({title:title, pdf:fileName})
// res.json({status:"OK", fileName})
const savedFile = await Pdfschema.create({ title, pdf: fileName });

res.json({
  status: "OK",
  fileName,
  _id: savedFile._id
});

} catch (error) {
    
   res.json({status:"error", message:error.message})    
}
    

})



app.get("/get-files",async(req,res)=>{
    try {
        

        const data = await Pdfschema.find({})
        res.json({status: "Ok", data: data})


    } catch (error) {
        // res.json({status:error})
        res.json({ status: "error", message: error.message });
    }
})

app.delete("/delete-file/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const file = await Pdfschema.findById(id);

    if (!file) {
      return res.json({ status: "error", message: "File not found" });
    }

    // Delete file from folder
    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "files", file.pdf);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Pdfschema.findByIdAndDelete(id);

    res.json({ status: "ok", message: "File deleted successfully" });

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});





app.get("/readData", async(req, res)=>{
    

    let dataget = await loginschema.find()
    res.json(dataget)
    
})

app.post("/loginDataCreate", async(req, res)=>{
    console.log(req.body);
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

app.get("/", async(req,res)=>{
    res.json("Succussfully running...")
})

app.listen(process.env.Port, ()=>{
    console.log(`Server running port on: ${process.env.Port}`);
    
})