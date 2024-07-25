let express=require("express")
let router=require("./router/movies.router")
let conc=require("./config/db")
let app=express()

app.use(express.json())
app.use("/glass",router)

app.get("/",(req,res)=>{
    res.send("successfuly we are in home")
})

app.listen(8000,async()=>{
    try{
        await conc
        console.log(`successfully hosted on 8000`)
        console.log("successfuly connected to mongodb")
    }catch(error){
        console.log(`error occured in  ${error}`)
    }
})