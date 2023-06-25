const { add, update, remove, get } = require("../plugins/socketFunctionType");

const LanguageSocket = async(req , type ,passingData) => {
    
    const io = req.app.get('io');


    switch(type){
        case add:
            io.emit('socketAddLanguage' , passingData);
            break;
        case update:
            io.emit('socketUpdateLanguage' , passingData);
            break;
        case remove:
            io.emit('socketRemoveLanguage' , passingData);
            break;
        case get:
            io.emit('socketGetLanguage' , passingData);
            break;
    }
}


module.exports = LanguageSocket; 