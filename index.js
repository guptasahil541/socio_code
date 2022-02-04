//Requiring express and express ejs layouts
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;

//Database connections and import
const db = require('./config/mongoose');

//Setting app
const app = express();

//Setting view engine as ejs and static files directory
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());
app.use(express.static('assets'));

//Middleware for using express ejs layouts
app.use(expressLayouts);

//Extract styles and scripts from different pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Route for homepage
app.use('/', require('./routes'));

//Server start
app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('The server is up and running on port:', port);
});