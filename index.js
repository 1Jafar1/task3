const bodyParser = require('body-parser')
const express=require('express')

const mongoose=require("mongoose")
const app=express()

app.use(bodyParser.json())
app.use(express.json())
const CSchema=new mongoose.Schema({
    title :String,
    price : Number,
    description :String,
    category:String,
    image:String ,
    name:String
})


const CategoryModel=mongoose.model('Category',CSchema)



app.get("/lab",async (req,res)=>{

    let lab_new= await CategoryModel.find()
    res.send(lab_new)

})
app.get("/lab/:id",async (req,res)=>{
    console.log(req)
      let id=req.params.id
      let lab_new= await CategoryModel.findById(id)
      res.send(lab_new)
  
  })

app.post('/lab', async (req,res)=>{
    console.log(req.body)
    let newCategory = new CategoryModel(req.body)
    await  newCategory.save()
    res.send(newCategory)
})


app.delete('/lab/:id', async (req,res)=>{
    let id=req.params.id
    let category= await CategoryModel.findByIdAndDelete(id)
    res.send(category)

})





mongoose.connect('mongodb+srv://jafarag:rDnsjCQAyMExTRS3@jafaraglab.ybyb3nq.mongodb.net/jafaraglab')
.then(res=>{
    console.log('qosuludur')
})
.catch(err=>{
    console.log(err)
})



app.listen(2020,()=>{
    console.log("2020 portu isleyir")
})