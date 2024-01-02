require("./models/db");
const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const customerController = require("./controllers/customerController");
var app = express();
 app.use(bodyparser.urlencoded({extended: false}));
 app.use(bodyparser.json());
 app.get('/',(req,res) => {
    res.send(`
        <h2 align = "center">Welcome to the Database</h2>
        <h3 align = "center">Click Here to access the <b><a href = "/customer/list">Database</a></b></h3>`
    )
 });
 
 app.set('views', path.join(__dirname, '/views/'));
 app.engine('hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultsLayout: "MainLayout",
    layoutsDir: __dirname + "/views/layouts/",
 }));
 app.set("view engine", "hbs");
 
app.listen(3000,() =>{
    console.log("Server have started on 3000");
});
app.use("/customer",customerController);