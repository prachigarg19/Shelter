const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine','ejs');

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/Swasti");

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    phone:String
});

const shelterSchema = new mongoose.Schema({
    email: String,
    password: String,
    phone: String,
    name:String,
    address:String
});

const contactSchema = new mongoose.Schema({
    message:String
});

const descriptionSchema = new mongoose.Schema({
    description:String
});

const User = new mongoose.model("User", userSchema);

const Shelter = new mongoose.model("Shelter", shelterSchema);

const descriptionModel = mongoose.model("description" , descriptionSchema);


app.get("/login",function (req,res) {
    res.render("login");
})

app.get("/register",function (req,res) {
    res.render("vsignup");
})

app.get("/Contact-Us", function (req,res) {
    res.render("Contact");
})

app.post("/Contact-Us", function (req,res) {
    const contact = new contactModel({
        message:req.body.message
    });
    contact.save(function (err) {
        if(err){
        console.log(err);
        }
        else{
        res.redirect("/");
    }
});
})

app.post("/register",function (req,res) {
    const newUser = new User({
        name:req.body.name,
        email : req.body.username,
        password : req.body.password,
        phone : req.body.phone
    });

    newUser.save(function (err) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
});

app.post("/sregister",function (req,res) {
    const newShelter = new Shelter({
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        name:req.body.name,
        address:req.body.address,
    });

    newShelter.save(function (err) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
})

app.get("/sregister",function (req,res) {
    res.render("ssignup");
})

app.get("/",function (req,res) {
    res.render("index");
})

app.get("/volunteer",function (req,res) {
    res.render("vdash");
})

app.get("/slogin",function (req,res) {
    res.render("slogin");
})

app.get("/vdash",function(req,res){
    Shelter.find(function (err, Shel) {
        if (Shel.length === 0) {
          Shelter.insertMany(array, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("success");
            }
          });
          res.redirect("/");
        } else {
          res.render("vdash", { arr: Shel });
        }
      });
    });

app.post("/login",function (req,res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username} , function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            if(found){
                if(password === found.password){
                    res.redirect("/vdash");
                }
            }
        }
    })
});

app.post("/slogin",function (req,res) {
    const username = req.body.username;
    const password = req.body.password;

    Shelter.findOne({email:username} , function (err,found) {
        if(err){
            console.log(err);
        }
        else{
            if(found){
                if(password === found.password){
                    res.redirect("/sdash");
                }
            }
        }
    })
});

app.get("/sdash",function(req,res){
    User.find(function (err, user) {
        if (user.length === 0) {
          User.insertMany(array, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("success");
            }
          });
          res.redirect("/");
        } else {
          res.render("sdash", { arrr: user });
        }
      });
    });

app.post("/sdash", function (req,res) {
    const description = new descriptionModel({
        description:req.body.description
    });
    description.save(function (err) {
        if(err){
        console.log(err);
        }
        else{
        res.redirect("/sdash");
    }
});
})

app.listen("3000", function () {
    console.log("Server is running");
});

