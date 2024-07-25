let mongoose=require("mongoose")
let url="mongodb://127.0.0.1:27017/MovieStar"

let conc=mongoose.connect(url)

module.exports=conc
