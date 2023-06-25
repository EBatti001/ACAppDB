const { add, update, remove, get } = require("../plugins/socketFunctionType");

const ProjectUnderDevelopmentSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddProjectUnderDevelopment' , passingData);
            break;
        case update:
            io.emit('socketUpdateProjectUnderDevelopment' , passingData);
            break;
        case remove:
            io.emit('socketRemoveProjectUnderDevelopment' , passingData);
            break;
        case get:
            io.emit('socketGetProjectUnderDevelopment' , passingData);
            break;
    }
}


module.exports = ProjectUnderDevelopmentSocket; 