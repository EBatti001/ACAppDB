const config = require("config");

getListenPort = () => process.env.PORT || config.get("listen");
getOriginList = () => config.get("originList");

module.exports = {
    getListenPort , getOriginList
}