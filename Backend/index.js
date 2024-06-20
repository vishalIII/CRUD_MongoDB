const express  = require('express')
const app=express();
const path = require('path');
const fs=require('fs')

const userModel = require('./usermodel')

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

// CRUD operations just for practice with MONGO DB 
app.get('/ct',async (req,res)=>{
    let createduser=await userModel.create({
        name:"harsh",
        email:"sanju@gmail.com",
        username:"sanju"
    })
    res.send(createduser)
})
app.get('/rd', async (req, res) => {
    try {
        // const username = req.query.username; // Assuming username is passed as a query parameter
        // const user = await userModel.findOne({ username: username });
        // if (!user) {
        //     return res.status(404).send('User not found');
        // }
        let user=await userModel.find();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get('/ed', async (req, res) => {
    try {
        let uduser = await userModel.findOneAndUpdate(
            { username: "sanju" },
            { name: "harshita" },
            { new: true }
        );
        res.send(uduser);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get('/dt',async (req,res)=>{
    try {
        // const username = req.query.username; // Assuming username is passed as a query parameter
        const user = await userModel.findOneAndDelete({ name:"harsh"});
        // if (!result) {
        //     return res.status(404).send('User not found');
        // }
        // let result = await userModel.find();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});


app.get('/',function(req,res) {
    fs.readdir(`./files`,function(err,files){
        // console.log(files)
        res.render("index",{files:files})
    })
})
app.get('/file/:filename',function(req,res) {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        // console.log(filedata)
        res.render('show',{filename:req.params.filename.slice(0, -4), filedata:filedata})
    })
})
app.get('/editdata/:filename',function(req,res) {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        // console.log(filedata)
        res.render('editdata',{filename:req.params.filename.slice(0, -4), filedata:filedata})
    })
})
app.post('/editdata',function(req,res){
    const name = req.body.name;
    const updatedData = req.body.updatedData;
    fs.writeFile(`./files/${name}.txt`,updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to the file:', err);
          return;
        }
        console.log('File has been updated successfully.');
      });
})
app.get('/edit/:filename',function(req,res) {
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        // console.log(filedata)
        res.render('edit',{filename:req.params.filename.slice(0, -4), filedata:filedata})
    })
})
app.post('/edit', function (req, res) {
    const previousName = req.body.previousname;
    const newName = req.body.newname;

    if (!previousName || !newName) {
        return res.status(400).send('Previous name and new name are required');
    }

    const oldPath = path.join(__dirname, 'files', previousName);
    const newPath = path.join(__dirname, 'files', newName);

    fs.rename(oldPath+".txt", newPath+".txt", function (err) {
        if (err) {
            console.error('Error renaming the file:', err);
            return res.status(500).send('Error renaming the file');
        }
        res.redirect('/');
    });

    console.log(req.body);
});
app.post('/create',function(req,res){
     console.log(req.body)
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
         res.redirect("/")
     })
})

app.listen(3000)
