const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash'); 
const router = require('./routes')
const app = express();
require('dotenv').config()

// enable files upload 

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const dotenv = require('dotenv')
dotenv.config()

//start app 
const port = process.env.PORT ;

 

app.get('/', (req, res) => {
  res.send('Hello World 2!')
})

app.use('/mailing',router)
app.listen(port, async () => {
  try { 
  console.log(`port : ${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})

 