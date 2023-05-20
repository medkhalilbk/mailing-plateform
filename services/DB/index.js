const mongoose = require('mongoose')

async function connectDB(){

     try {
        const con = await  mongoose.connect(process.env.DB)
          console.log('connected')
   } catch (error) {
        console.log(error)
   }
 
}

module.exports = {connectDB}