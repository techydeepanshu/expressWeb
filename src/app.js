const express = require('express');
const path = require('path');
const hbs = require('hbs');  //this for using partials in .hbs files
const app = express();
// const port = 3000; // process.env.PORT is using when deploy on live
const port = process.env.PORT || 3000; // process.env.PORT is using when deploy on live


app.set("view engine","hbs");

//*** ager ap css ko views folder m .hbs wali file me css ko use krna chahte ho to ye code use krna h
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));


//this code for change name of views to template
const template_path = path.join(__dirname,"../template/views");
app.set("views",template_path);

//using this code u can use partials
const partials_path = path.join(__dirname,"../template/partials");
hbs.registerPartials(partials_path);
console.log(partials_path);





app.get("/",(req,res)=>{
    // res.send("welcome to my home page");
    res.render('index');
})
app.get("/weather",(req,res)=>{
    // res.send("welcome to my about us page");
    res.render('weather');
})
app.get("/about",(req,res)=>{
    // res.send("welcome to my about us page");
    res.render('about');
})
app.get("/db",(req,res)=>{
    // res.send("welcome to my about us page");
    res.render('db');
})
app.get("*",(req,res)=>{
    // res.send("404 error page and page not found");
    res.render('404');
})

app.listen(port,()=>{
    console.log(`listing for ${port} port number`);
})