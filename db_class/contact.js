const express = require("express")
const router = express.Router();
const Joi = require("joi");


const { asyncMiddleware } = require("../middleware/commonMiddleware");
const db = require("../app_class/database");
const status = require("../app_class/httpStatusCodes");
const { mandatory , optional , validateInputByJoi } = require("../plugins/joi");
const ContactSocket = require("../socket/socket_contact");
const { get, add, update, remove } = require("../plugins/socketFunctionType");


router.get("/", asyncMiddleware((req, res, next) =>{

    db.query("SELECT * FROM contact", async (err , result , fields) => {
        if(err) next(err);

        await ContactSocket(req, get, result);
        await status.ok_200(res, result);
    });
}));


router.get("/search/:id", asyncMiddleware( async(req, res, next) =>{

    db.query("SELECT * FROM contact WHERE id = ?", [req.params.id], async (err , result , fields) => {
        if(err) next(err);
        await status.ok_200(res, result);
    });
    
}));


router.post("/", asyncMiddleware( async(req, res, next) => {


    db.query("SELECT COUNT(*) as count FROM contact", async (err , result , fields) => {
        if(err) next(err);

        if( result[0].count == 0 ){

            const { email, mobile , address  } = req.body;

            const JoiValidation = await validateInputByJoi({
                email : mandatory.email(),
                mobile : mandatory.mobile(),
                address : mandatory.address()
            });

            if( await JoiValidation(req , res)){
                db.query("INSERT INTO contact( email, mobile,  address ) VALUES(?,?,?)", [ email, mobile , address  ] , async (err , result , fields) =>{
                    if(err) next(err);

                    const { insertId } = result;
                    await ContactSocket(req, add , { id : insertId, email, mobile , address })
                    await status.created_201(res , { id : insertId  , message : insertId +" was inserted successfully" });
                });
            }
            
        }
        else{
            await status.notAcceptable_406(res, "Already you have data, so please update that");
        }
    })

    

}));

router.put("/" , asyncMiddleware( async ( req, res , next ) =>{
    
    const { id , email, mobile , address  } = req.body;

    const JoiValidation = await validateInputByJoi({
        id : mandatory.id(),
        email : mandatory.email(),
        mobile : mandatory.mobile(),
        address : mandatory.address()
    });

    if( await JoiValidation(req, res)){

        db.query("UPDATE contact SET email = ? , mobile = ?, address = ?  WHERE id = ?", [ email, mobile , address , id ], async (err, result , fields) => {
            if(err) next(err);

            await ContactSocket(req, update, { email, mobile , address , id  });
            await status.ok_200(res , { id , message : id +" was updated successfully" });
        });
    }
}));

router.delete("/", asyncMiddleware(async (req, res , next )=>{
    const {id} = req.body;

    const JoiValidation = await validateInputByJoi({
        id : mandatory.id()
    });

    if( await JoiValidation(req, res)){
        db.query("DELETE FROM contact WHERE id = ?", [id] , async (err, result, fields) => {
            if(err) next(err);

            ContactSocket(req, remove , { id })
            await status.ok_200(res , { id , message: id +" deleted successfully" });
        })
    }

}));

module.exports = router;