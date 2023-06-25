
const Joi = require("joi");
const status = require("../app_class/httpStatusCodes");

const MyJoi = {
    id : () => Joi.number(),
    name : ()=> Joi.string(),
    mobile : ()=> Joi.string(),
    dateOfBirth : ()=> Joi.date().iso(),
    address : ()=> Joi.string(),
    email : ()=> Joi.string().email({
        tlds: {
            allow: false
        }
    }),
    username : ()=> Joi.string(),
    password : ()=> Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password : (passwordBoxName)=> Joi.valid(Joi.ref(passwordBoxName)),
    year : ()=> Joi.number().min(4),
    text : ()=> Joi.string(),
    percentage : ()=> Joi.number().max(100).min(0),
    fk: ()=> Joi.number(),
    boolean : ()=> Joi.boolean(),
    link : ()=> Joi.string()
}

const optional = {
    id : () => MyJoi.id().allow('', null),
    name : ()=> MyJoi.name().allow('', null),
    mobile : ()=> MyJoi.mobile().allow('', null),
    dateOfBirth : ()=> MyJoi.dateOfBirth().allow('', null),
    address : ()=> MyJoi.address().allow('', null),
    email : ()=> MyJoi.email().allow('', null),
    username : ()=> MyJoi.username().allow('', null),
    password : ()=> MyJoi.password().allow('', null),
    confirm_password : (passwordBoxName) => MyJoi.confirm_password(passwordBoxName).allow('', null),
    year : ()=> MyJoi.year().allow('', null),
    text : ()=> MyJoi.text().allow('', null),
    percentage : ()=> MyJoi.percentage().allow('', null),
    fk: ()=> MyJoi.fk().allow('', null),
    boolean : ()=> MyJoi.boolean().allow('', null),
    link : ()=> MyJoi.link().allow('', null)
}

const mandatory = {
    id : () => MyJoi.id().required(),
    name : ()=> MyJoi.name().required(),
    mobile : ()=> MyJoi.mobile().required(),
    dateOfBirth : ()=> MyJoi.dateOfBirth().required(),
    address : ()=> MyJoi.address().required(),
    email : ()=> MyJoi.email().required(),
    username : ()=> MyJoi.username().required(),
    password : ()=> MyJoi.password().required(),
    confirm_password : (passwordBoxName)=> MyJoi.confirm_password(passwordBoxName).required(),
    year : () => MyJoi.year().required(),
    text : () => MyJoi.text().required(),
    percentage : ()=> MyJoi.percentage().required(),
    fk : ()=> MyJoi.fk().required(),
    boolean : ()=> MyJoi.boolean().required(),
    link : ()=> MyJoi.link().required(),
}


getAdultDateOfBirth = async () =>{
    const currentYear = new Date().getFullYear();
    console.log(currentYear);
}


validateInputByJoi = async( schemaObject ) =>{
    return async ( req , res)=> {
        const schema = Joi.object(schemaObject);

        const { error , value } = await schema.validate(req.body , {abortEarly : false});
        if(error){
            status.badRequest_400(res, error);
        }
        else{
            return true;
        }
    }
}


module.exports = {
    optional , mandatory , validateInputByJoi
}