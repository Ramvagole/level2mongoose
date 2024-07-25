let express=require("express")
let Movie=require("../model/movie.model")
let router=express.Router()

router.post("/movies",async(req,res)=>{
    try{
        let {title,director,releaseDate,rating,duration,description}=req.body
        let movie=new Movie({
            title:title,
            director:director,
            releaseDate:releaseDate,
            rating:rating,
            duration:duration,
            description:description
        })
        await movie.save()
        res.status(200).json(movie)
    }catch(error){
        res.status(400).json({message:"error occured well adding",error})
    }
})

router.get("/movies",async(req,res)=>{
    try{
        let {q,page=1,limit=10}=req.query
        const query={}
        if(q){
            query.title= new RegExp(q,"i")
        }
        const options={
            limit:parseInt(limit,10),
            skip:(parseInt(page,10)-1)*parseInt(limit,10),
            sort:{releaseDate:1}
        }
        let movie=await Movie.find(query,null,options)
        res.status(200).json(movie)
    }catch(error){
        res.status(400).json({message:"error occured well geting",error})
    }
})

router.put("/movies/:id",async(req,res)=>{
    try{
        let movie= await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!movie){
            return res.status(404).json({ message: 'Movie not found' })
        }
        res.json(movie)
    }catch(error){
        res.status(400).json({message:"error occured well updating",error})
    }
})
router.delete('/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})
module.exports=router