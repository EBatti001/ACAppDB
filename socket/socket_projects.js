const { add, update, remove, get } = require("../plugins/socketFunctionType");

const ProjectsSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddProjects' , passingData);
            break;
        case update:
            io.emit('socketUpdateProjects' , passingData);
            break;
        case remove:
            io.emit('socketRemoveProjects' , passingData);
            break;
        case get:
            io.emit('socketGetProjects' , passingData);
            break;
    }
}


module.exports = ProjectsSocket; 