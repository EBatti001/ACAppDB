const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { asyncMiddleware } = require("../middleware/commonMiddleware");
const db = require("../app_class/database");
const status = require("../app_class/httpStatusCodes");
const { mandatory , optional , validateInputByJoi } = require("../plugins/joi");
const { getHasPassword , comparePassword } = require("../plugins/bcrypt");
const { generateAccessToken } = require("../app_class/auth");


router.get("/", asyncMiddleware((req, res, next) =>{

    db.query("SELECT * FROM login_user", async (err , result , fields) => {
        if(err) next(err);
        await status.ok_200(res, result);
    });
}));



router.get("/search/:id", asyncMiddleware( async(req, res, next) =>{

    db.query("SELECT * FROM login_user WHERE id = ?", [req.params.id], async (err , result , fields) => {
        if(err) next(err);
        await status.ok_200(res, result);
    });
    
}));


router.post("/validate_user", asyncMiddleware( async(req, res, next)=>{
    
    const { username , password } = req.body;
    
    const JoiValidation = await validateInputByJoi({
        username : mandatory.username(),
        password : mandatory.password()
    });


    if( await JoiValidation(req,res)){
       
        db.query("SELECT * FROM login_user WHERE username = ? ", [ username], async(err , result , fields) =>{
            if(err) next(err)

            if( result.length == 1 ){
                const { id , name , username ,password : dbPassword } = result[0];
                if( await comparePassword(password , dbPassword) ){


                    status.ok_200(res, {
                        token : await generateAccessToken({ id, name , username }),
                        id : id ,
                        name : name,
                        username : username
                    });
                }
                else{
                    status.unauthorized_401(res ,"Unauthorized User");
                }
            }
            else{
                status.notFound_404(res ,"The given username was not found");
            }
        })
    }

}));

router.post("/", asyncMiddleware( async(req, res, next) => {


    const { name , username , password  } = req.body;


    const JoiValidation = await validateInputByJoi({
        name : mandatory.name(),
        username : mandatory.username(),
        password : mandatory.password(),
        confirmPassword : mandatory.confirm_password("password")
    });

    if( await JoiValidation(req , res)){
        db.query("INSERT INTO login_user(name, username, password) VALUES(?,?,?)", [ name , username , await getHasPassword(password) ] , async (err , result , fields) =>{
            if(err) next(err);
            status.created_201(res , { id : result.insertId  , message : result.insertId +" was inserted successfully" });
        });
    }

}));

router.put("/" , asyncMiddleware( async ( req, res , next ) =>{
    
    const { id , name , username , password  } = req.body;

    const JoiValidation = await validateInputByJoi({
        id : mandatory.id(),
        name : mandatory.name(),
        username : mandatory.username(),
        password : mandatory.password(),
        confirmPassword : mandatory.confirm_password("password")
    });

    if( await JoiValidation(req, res)){

        db.query("UPDATE login_user SET name = ? , username = ? , password = ? WHERE id = ?", [ name , username , await getHasPassword(password) , id ], async (err, result , fields) => {
            if(err) next(err);
            status.ok_200(res , { id , message : id +" was updated successfully" });
        });
    }
}));

router.delete("/", asyncMiddleware(async (req, res , next )=>{
    const {id} = req.body;

    const JoiValidation = await validateInputByJoi({
        id : mandatory.id()
    });

    if( await JoiValidation(req, res)){
        db.query("DELETE FROM login_user WHERE id = ?", [id] , async (err, result, fields) => {
            if(err) next(err);

            status.ok_200(res , { id , message: id +" deleted successfully" });
        })
    }

}));

module.exports = router;