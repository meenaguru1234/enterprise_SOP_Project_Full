const mongoose = require("mongoose")

const loginschema = new mongoose.Schema({
    
    username:{
        type:String,
        requried:true
    },
     
      password:{
        type:String,
        requried:true
   
    }
})

module.exports = mongoose.model("Logincollection", loginschema)