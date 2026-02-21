const express = require("express")

const app = express()
const mongoose  = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const loginschema = require("./Controller/middleware/Loginschema")
const cors = require("cors")

const pdfParse = require("pdf-parse");
const fs = require("fs");
const Chunk = require("./Controller/middleware/Chunckschema")
const File = require("./Controller/middleware/Fileschema")
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


//multer


const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
    cb(null,  './imageUpload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null, uniqueSuffix + file.originalname)

    cb(null, Date.now() + ".pdf")

  }
})




const upload = multer({ storage: storage })
require("./Controller/middleware/Pdfschema")
const UploadPdf = mongoose.model("PdfDetails")


app.post("/upload-files", upload.single("file"), async(req,res)=>{
    console.log(req.file);
// res.json("hi")
const title = req.body.title;
const fileName = req.file.filename;
console.log(fileName, title);

try {
    
await UploadPdf.create({title:title, pdf:fileName})
res.send({status:"ok", fileName})
// const savedFile = await UploadPdf.create({ title, pdf: fileName });

// res.send({
//   status: "OK",  fileName, _id: savedFile._id
// });

// 2 read pdf
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text;

    // 3 chunk split (500 chars each)
    const size = 500;
    const chunks = [];

    for (let i = 0; i < text.length; i += size) {
      chunks.push(text.substring(i, i + size));
    }

     // 4 store chunks in DB
    const chunkDocs = chunks.map(c => ({
      fileId: newFile._id,
      text: c
    }));

    await Chunk.insertMany(chunkDocs);

    res.json({ message: "PDF stored & chunked" });


} catch (error) {
    
   res.status(500).json({error:" upload error"})    
}




app.post("/imageUpload").upload.single('img'), async(req,res)=>{
  console.log(req);
  
}




app.post("/uploadpdf", upload.single("file"), async (req, res) => {
  try {
    const newPdf = new PdfModel({
      title: req.body.title,
      pdf: req.file.filename,
    });

    await newPdf.save();

    res.json({ message: "PDF uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
    

})

app.get("/search", async (req, res) => {
  const query = req.query.q;

  const results = await Chunk.find({
    text: { $regex: query, $options: "i" }
  }).limit(10);

  res.json(results);
});



app.get("/get-files",async(req,res)=>{
    try {
        

        const data = await UploadPdf.find({})
        res.json({status: "successfully get files", data: data})


    } catch (error) {
        // res.json({status:error})
        res.json({ status: "error", message: error.message });
    }
})

app.delete("/delete-file/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const file = await UploadPdf.findById(id);

    if (!file) {
      return res.json({ status: "error", message: "File not found" });
    }

    // Delete file from folder
    const fs = require("fs");
    const path = require("path");

    // const filePath = path.join(__dirname, "files", file.pdf);
    app.use("/files", express.static("files"))

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

    // Delete from database
    await UploadPdf.findByIdAndDelete(id);

    res.json({ status: "ok", message: "File deleted successfully" });

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

app.post("/imageUpload", upload.single('img'), async(req,res)=>{
  // console.log(req);
  try {

    console.log(req.file.filename);

    let imgFile = req.file ? req.file.filename : null
    console.log(imgFile);

    let {name} = req.body
    const data = await new imgModelschema({

      name,
      img:imgFile
    })
    
    
const datasave = await data.save()


    res.json("image uploaded successfully")
  } catch (error) {
    res.json("image not uploaded")
  }
  
})




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
                 res.status(200). json({existingusername, msg:"Login Successfully"})

})

app.get("/", async(req,res)=>{
    res.json("Succussfully running...")
})



// app.listen(process.env.Port, ()=>{
//     console.log(`Server running port on: ${process.env.Port}`);
    
// })

const readPDF = require("./files/readPdf");
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate-sop", async (req, res) => {

  const { title, description } = req.body;

  try {

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `Write a professional SOP.

Title: ${title}
Description: ${description}`
    });

    res.json({ result: response.output[0].content[0].text });

  } catch (err) {
    res.json({ result: "AI limit reached. Try later." });
  }
});




app.post("/ask-ai", async (req, res) => {
  try {
    const { question, filename } = req.body;
console.log("QUESTION:", question);
  console.log("FILENAME:", filename); 
    // read pdf text
    const text = await readPDF(`./files/${filename}`);

    // send to AI
    const response = await OpenAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Answer only from given SOP document. If not found say 'Not in SOP'.",
        },
        {
          role: "user",
          content: `Document:\n${text}\n\nQuestion: ${question}`,
        },
      ],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});