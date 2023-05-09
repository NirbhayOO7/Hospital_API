const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const mongoose = require('./config/mongoose');

// middleware used to decode the encrypted data with the help of bodyparser 
app.use(bodyParser.urlencoded({extended: false}));

//setting up express router
app.use('/',require('./routes'));   //it by default fetch up the ./routes/index.js

app.listen(port, function(err){
    if(err){
        console.log('Error starting server:', err);
    }

    console.log('Server is running over port:', port);
    return;
})