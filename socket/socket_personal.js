const { add, update, remove, get } = require("../plugins/socketFunctionType");

const PersonalSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddPersonal' , passingData);
            break;
        case update:
            io.emit('socketUpdatePersonal' , passingData);
            break;
        case remove:
            io.emit('socketRemovePersonal' , passingData);
            break;
        case get:
            io.emit('socketGetPersonal' , passingData);
            break;
    }
}


module.exports = PersonalSocket; 