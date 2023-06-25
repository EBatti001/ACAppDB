const { add, update, remove, get } = require("../plugins/socketFunctionType");

const DevelopmentSkillsSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddDevelopmentSkills' , passingData);
            break;
        case update:
            io.emit('socketUpdateDevelopmentSkills' , passingData);
            break;
        case remove:
            io.emit('socketRemoveDevelopmentSkills' , passingData);
            break;
        case get:
            io.emit('socketGetDevelopmentSkills' , passingData);
            break;
    }
}


module.exports = DevelopmentSkillsSocket; 