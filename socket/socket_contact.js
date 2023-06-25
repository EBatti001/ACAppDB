const { add, update, remove, get } = require("../plugins/socketFunctionType");

const ContactSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddContact' , passingData);
            break;
        case update:
            io.emit('socketUpdateContact' , passingData);
            break;
        case remove:
            io.emit('socketRemoveContact' , passingData);
            break;
        case get:
            io.emit('socketGetContact' , passingData);
            break;
    }
}


module.exports = ContactSocket; 