
asyncMiddleware = ( callBackFun ) =>{
    return async(req, res , next) =>{
        try{
            await callBackFun(req , res, next);
        }
        catch(err){
            next(err);
        }
    };
}


module.exports ={
    asyncMiddleware
}