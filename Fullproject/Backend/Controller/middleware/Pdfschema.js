const mongoose = require("mongoose")

const pdfschema = new mongoose.Schema({
    pdf:
    {
        type:String
    },
    title:{

        type:String
    },
    // id:date.now()

}
)

module.exports =mongoose.model("PdfDetails", pdfschema)