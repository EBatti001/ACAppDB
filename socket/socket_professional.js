const { add, update, remove, get } = require("../plugins/socketFunctionType");

const ProfessionalSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddProfessional' , passingData);
            break;
        case update:
            io.emit('socketUpdateProfessional' , passingData);
            break;
        case remove:
            io.emit('socketRemoveProfessional' , passingData);
            break;
        case get:
            io.emit('socketGetProfessional' , passingData);
            break;
    }
}


module.exports = ProfessionalSocket; 