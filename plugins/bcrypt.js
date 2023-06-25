
// npm i bcrypt

const bcrypt = require("bcrypt");
const saltRounds = 10;

getHasPassword = async ( planTextPassword ) => {
    
   return await bcrypt.hashSync( planTextPassword , saltRounds);
}

comparePassword = async ( planTextPassword , hashPassword  ) => {
    return await bcrypt.compareSync(planTextPassword , hashPassword);;
}

module.exports = {
    getHasPassword , comparePassword
}