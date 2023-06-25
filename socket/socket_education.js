const { add, update, remove, get } = require("../plugins/socketFunctionType");

const EducationSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddEducation' , passingData);
            break;
        case update:
            io.emit('socketUpdateEducation' , passingData);
            break;
        case remove:
            io.emit('socketRemoveEducation' , passingData);
            break;
        case get:
            io.emit('socketGetEducation' , passingData);
            break;
    }
}


module.exports = EducationSocket; 