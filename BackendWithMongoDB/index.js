const express  = require('express')
const app=express();
const path = require('path');

const userModel = require('./models/user');
const { read } = require('fs');

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/create',async (req,res)=>{
    const v=req.body;
    let createduser=await userModel.create({
        name:v.name,
        email:v.email,
        image:v.image
    })
    res.redirect("/read")
})

app.get('/read',async (req,res)=>{
    const users=await userModel.find()
    // console.log(users)
    res.render('read' , {users:users})
})

app.get('/delete-user/:id',async (req, res) => {
    const userId =req.params.id
    const user = await userModel.findOneAndDelete({ _id:userId})
    res.redirect("/read")
});

app.post('/update/:id',async (req,res)=>{
    const v=req.body;
    let {image,name,email}=req.body;
    let updateduser=await userModel.findOneAndUpdate({_id:req.params.id}, {image,name,email})
    res.redirect("/read")
})

app.get('/edit-user/:id',async (req, res) => {
    const userId =req.params.id
    let user = await userModel.findOne({ _id: userId });
    res.render('edit',{user})
});

app.listen(3000);