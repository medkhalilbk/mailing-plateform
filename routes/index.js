const express = require("express");
const { Auth } = require("../operations/auth");
const router = express.Router();
const fs = require('fs'); // Import the fs module
const middlware = require('../operations/middlware').middleware
// Home page route. 
router.get("/dashboard", function (req, res) {
  res.send("home page");
}); 

const multer = require('multer');
const CsvReadableStream = require('csv-reader');
const { uniqueId, random } = require("lodash");  
const { readSingleFile, getEmailArray } = require("../operations/readfile");
const { mailistModel } = require("../models/mailist");
const { default: mongoose } = require("mongoose");
// Set up multer storage configuration
let newFileName ; 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where the uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueFileName = uniqueId()+Math.floor(random(12345670)); // Generate a unique ID for the filename
    const fileExtension = file.originalname.split('.').pop(); // Get the file extension from the original filename
    newFileName = `${uniqueFileName}.${fileExtension}`; // Combine the unique ID and file extension
    cb(null, newFileName); // Use the new filename for the uploaded file
  }
});

// Create multer upload instance with fileFilter option
const upload = multer({
  storage: storage 
  
});

router.post('/import',middlware, upload.single('recfile'), async function (req, res) {
  // Access the uploaded file using req.file
  if (!req.file && req.body) { 
    const collectionWithoutName = await mailistModel.create({name:req.body.name, userId:null})
 
  return res.status(200).json({mailistId:(collectionWithoutName)})
  }
 try {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
 
  }





  const inputStream = fs.createReadStream(req.file.path, 'utf8');
  const mails =[];  
  console.log(req.body)
  const mailist = new mailistModel({name:newFileName,userID:{} , label:req.body.label})
  const saveMailist = await mailist.save()
  inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
      mails.push(row);
    })
    .on('end', function () {
      // File upload and parsing successful
    return  res.json({ message: 'File uploaded and parsed successfully'  , filename:newFileName});
    })
    .on('error', function (error) {
      // File parsing error
    return  res.status(500).json({ error: 'Error parsing the CSV file' });
    });
 } catch (error) {
 return res.status(500).send('not ok')
 }
});
router.get('/:listId', middlware ,async function (req,res) {
try {
  if(req.params.listId){
    let mails = await mongoose.model('mailist').findOne({label:req.params.listId})
    console.log(mails)
    let emails = await readSingleFile(mails.name)
    return res.send({infos:mails ,mails:getEmailArray(emails)})
 }else{
  return res.status(500).send({error:message})
 }
} catch (error) {
  console.log(error)
  return res.status(500).send({error:"file not found!"})
}
} )
router.post("/login", async function (req, res) {
  try {   
    console.log(req.body)
    const login = await  Auth({user:req.body.username,password:req.body.password})
    if(!login.token){
      return res.status(500).send('error') 
    }
    console.log(login)
    return res.status(200).send(login)
  } catch (error) {
    res.status(401).json(error)
    console.log('o')
  }
});

module.exports = router;
