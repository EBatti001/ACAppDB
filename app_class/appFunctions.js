const { isObject } = require("util");


sqlResultToJsonObject = async ( sqlResult , jsonObjectTemplate ) =>{

    let ReturnObject = [];

    for( let row of sqlResult  ){

        await sqlResultToJsonObjectFun(row , jsonObjectTemplate , ReturnObject );
    }

    

    return ReturnObject;

}


sqlResultToJsonObjectFun = async ( row , objectTemplate , JSONArray , isFirstLoop = true ) =>{
    
    const objectKeysCount = Object.keys(objectTemplate).length;
    const objectKeys = Object.keys(objectTemplate);
    for( let tableIndex = 0; tableIndex < objectKeysCount; tableIndex++  ){
        const currentTableName = objectKeys[tableIndex];

        let columnInfo = {};

        for( let columnName of objectTemplate[currentTableName] ){
            
            if( ! isObject(columnName)){
                columnInfo[ await getColumnNameFromSQLAlias( columnName ) ] = row[columnName];
            }else{
               await addFkTableArrayInsideObject(columnName , columnInfo);
               await sqlResultToJsonObjectFun(row, columnName , JSONArray , false);
            }
        }

        if( isFirstLoop ){
            JSONArray.push(columnInfo);
        }
        else{
            await getFKTableArrayInsideJsonObject(currentTableName, JSONArray , columnInfo );
        }
        // console.log(columnInfo);
    }

    console.log("after loop JSONArray view")
    console.log("-------------Start-------------------")
    console.log(JSON.stringify(JSONArray));
    console.log("-------------End-------------------")

}

addFkTableArrayInsideObject = async( tableObject , RowObject  ) => {
    for( let FkTableName of Object.keys(tableObject)){
        RowObject[FkTableName] = {}
    }
}

getFKTableArrayInsideJsonObject = async( fkTableName , JSONObject , insertDataObject ) =>{

    console.log("--------- in function start --------------------")
    console.log(JSON.stringify(JSONObject));
    console.log("--------- in function end --------------------")

    for( let rowObject of JSONObject){
        console.log( JSON.stringify(rowObject) );

        for( let key of Object.keys(rowObject) ){

            if( key == fkTableName ){
                rowObject[key] = insertDataObject;
            }

        }

    }


}

getColumnNameFromSQLAlias = async ( aliasName ) => aliasName.substring( aliasName.indexOf("_")+1, aliasName.length );

recursiveGetValueFromSQLResult = async(sqlResult , jsonObjectTemplate) =>{

}


module.exports = {
    sqlResultToJsonObject
}