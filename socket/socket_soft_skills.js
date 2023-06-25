const { add, update, remove, get } = require("../plugins/socketFunctionType");

const SoftSkillsSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddSoftSkills' , passingData);
            break;
        case update:
            io.emit('socketUpdateSoftSkills' , passingData);
            break;
        case remove:
            io.emit('socketRemoveSoftSkills' , passingData);
            break;
        case get:
            io.emit('socketGetSoftSkills' , passingData);
            break;
    }
}


module.exports = SoftSkillsSocket; 