const { add, update, remove, get } = require("../plugins/socketFunctionType");

const cvHeadSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddCVHead' , passingData);
            break;
        case update:
            io.emit('socketUpdateCVHead' , passingData);
            break;
        case remove:
            io.emit('socketRemoveCVHead' , passingData);
            break;
        case get:
            io.emit('socketGetCVHead' , passingData);
            break;
    }
}


module.exports = cvHeadSocket; 