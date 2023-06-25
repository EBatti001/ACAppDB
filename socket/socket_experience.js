const { add, update, remove, get } = require("../plugins/socketFunctionType");

const ExperienceSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddExperience' , passingData);
            break;
        case update:
            io.emit('socketUpdateExperience' , passingData);
            break;
        case remove:
            io.emit('socketRemoveExperience' , passingData);
            break;
        case get:
            io.emit('socketGetExperience' , passingData);
            break;
    }
}


module.exports = ExperienceSocket; 