const { add, update, remove, get } = require("../plugins/socketFunctionType");

const ReferenceMobileSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddReferenceMobile' , passingData);
            break;
        case update:
            io.emit('socketUpdateReferenceMobile' , passingData);
            break;
        case remove:
            io.emit('socketRemoveReferenceMobile' , passingData);
            break;
        case get:
            io.emit('socketGetReferenceMobile' , passingData);
            break;
    }
}


module.exports = ReferenceMobileSocket; 