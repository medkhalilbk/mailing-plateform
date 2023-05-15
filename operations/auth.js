const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv') 

async function Auth({user,password})  {

try {  
    const decryptPw = await bcrypt.compare(password,process.env.pass)
    if(!decryptPw){

        throw  Error("invalid credentials");
    }

    if(!user && !password){
       throw  Error('Invalid request')
    }
    if((user !== process.env.admin )){
        throw  Error("invalid credentials");
    } 
 


    if((user.trim() == process.env.admin) && bcrypt.compareSync(password,process.env.pass)){
        const token = jwt.sign( {user:user}, process.env.pass, { expiresIn: 60 * 15});

        return {
            user:"admin",
            id:1,
            token: token
        }
    }
} catch (error) {
    return error.message
}


}

module.exports = {Auth}