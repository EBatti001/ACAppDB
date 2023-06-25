
const config = require("config");
const mysql = require("mysql");

const myDBInfo = config.get("db");

const connection = mysql.createConnection(myDBInfo, 

    
    (err) => {

        console.log(myDBInfo);
        if( err ){
            console.log(err) 
        }
        else{
            console.log("MySQL connected succeeded")
        }
    }
        
    );

module.exports = connection;

