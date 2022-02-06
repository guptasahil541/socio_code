//Requiring express and express ejs layouts
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const port = 8000;

//Requiring files for user session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//Database connections and import
const db = require('./config/mongoose');

//Setting app
const app = express();

//For string and query params
app.use(express.urlencoded());

//For storing and editing cookies
app.use(cookieParser());

//For including static files like css, js, images etc.
app.use(express.static('assets'));

//Middleware for using express ejs layouts
app.use(expressLayouts);

//Setting view engine as ejs and static files directory
app.set('view engine', 'ejs');
app.set('views', './views');

//Extract styles and scripts from different pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: "socio_code",
    //TODO change before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

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