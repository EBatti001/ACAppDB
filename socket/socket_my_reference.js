const { add, update, remove, get } = require("../plugins/socketFunctionType");

const MyReferenceSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddMyReference' , passingData);
            break;
        case update:
            io.emit('socketUpdateMyReference' , passingData);
            break;
        case remove:
            io.emit('socketRemoveMyReference' , passingData);
            break;
        case get:
            io.emit('socketGetMyReference' , passingData);
            break;
    }
}


module.exports = MyReferenceSocket; 