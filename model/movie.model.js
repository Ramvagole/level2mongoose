const mongoose=require("mongoose")

let movieSchema=new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    director:{type:String,trim:true},
    releaseDate:{type:Date},
    rating:{type:Number,min:0,max:10},
    duration:{type:Number},
    description:{type:String,trim:true}
},{timestamps:true})

let Movie=mongoose.model("Movie",movieSchema)

module.exports=Movie