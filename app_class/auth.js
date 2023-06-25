const config = require("config")
const jwt = require('jsonwebtoken');
const status = require('../app_class/httpStatusCodes')


generateAccessToken = async ( dataObject ) =>{
    const MyJWTPrivatekey = config.get('jwtPrivateKey');
    // const token = jwt.sign(dataObject, MyJWTPrivatekey , { expiresIn : '1800s' } );
    const token = jwt.sign(dataObject, MyJWTPrivatekey );
    return token;
}

verifyAccessToken = async (getTokenFromRequest , res , next ) => {
    const MyJWTPrivatekey = config.get('jwtPrivateKey');
    
    
    jwt.verify(getTokenFromRequest, MyJWTPrivatekey , async (err, decoded)=>{
        if(err){
            // const message = ( err.name === "TokenExpiredError") ? "Your token expired" : "Unauthorized User access";
            status.unauthorized_401(res, err.name);
        }
        else{
            // console.log(decoded);
            next();
        }

    });
    
}

validatePublicUrl = async (url) => {
    const publicUrlList = config.get("publicUrls");
    for( let publicUrl of publicUrlList ){

        if( publicUrl === url ){
            return true;
        }
    }

    return false;
}

isYourOrigin = async(domain) =>{
    
    const originList = config.get("originList");
    for( let origin of originList )
    {
        if( origin === domain ){
            return true;
        }
    }

    return false;
}


module.exports = {
    generateAccessToken,
    verifyAccessToken,
    validatePublicUrl,
    isYourOrigin
}