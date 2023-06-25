

module.exports = async (err , req, res, next) =>{

    console.log(err);

    if( err.sqlMessage ){
        res.status(500).send(err.sqlMessage);
    }
    else{
        res.status(500).send(err);
    }

}