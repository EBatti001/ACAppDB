const { add, update, remove, get } = require("../plugins/socketFunctionType");

const ProfileSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddProfile' , passingData);
            break;
        case update:
            io.emit('socketUpdateProfile' , passingData);
            break;
        case remove:
            io.emit('socketRemoveProfile' , passingData);
            break;
        case get:
            io.emit('socketGetProfile' , passingData);
            break;
    }
}


module.exports = ProfileSocket; 