const mongoose = require('mongoose') 

const schema = new mongoose.Schema({ name: String, userId: mongoose.Types.ObjectId , label:String  } , {timestamps:true});
const mailistModel = mongoose.model('mailist', schema);

module.exports = {mailistModel}

