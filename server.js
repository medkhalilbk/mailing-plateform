const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');
const app = express();
require('dotenv').config();

// Add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const { readMailist } = require('./operations/readlist');
const { connectDB } = require('./services/DB');
const filePath = "./list.csv";

// Start app
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World 2!');
});

app.use('/mailing', router);

app.listen(port, async () => {
  try {
    const connect = await connectDB()
    console.log(`Server started on port: ${port}`);
 /*    const mailist = await readMailist(filePath);
    console.log(mailist); */
    function generateRandomEmail() {
      const length = 10;
      let email = '';
    
      // Generate a random email with 10 characters
      for (let i = 0; i < length; i++) {
        email += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      }
    
      email += '@example.com';
      return email;
    }
/*     let records = []
    for (let i = 0; i < 100; i++) {
      const email = generateRandomEmail();
      records.push({ email: email });
    }
    records.forEach(e => {
      console.log(e.email+",")
    }) */

  } catch (error) {
    console.log(error);
  }
});
