const jwt = require("jsonwebtoken");
const status = require('../app_class/httpStatusCodes');
const { verifyAccessToken, validatePublicUrl, isYourOrigin } = require('../app_class/auth');

module.exports = async(req, res , next) => {

    
    const hostName = req.get('host');

    const isPublicUrl = await validatePublicUrl(req.originalUrl);
    const token = req.headers["x-access-token"];

    const isOrigin = await isYourOrigin(hostName);
    const isGetMethod = req.method === "GET";

    // status.ok_200(res, `isPublicUrl = ${isPublicUrl} , isOrigin - ${isOrigin}, isGetMethod - ${ isGetMethod}`);

    if(isPublicUrl || ( isOrigin && isGetMethod ) ){
        next();
    }else if( token ){

        await verifyAccessToken(token , res , next);

    }else{
        status.badRequest_400(res, "Invalid access Token");
    }
    

    

}