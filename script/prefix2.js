
const fs = require("fs");
module.exports.config = {
name: "prefix2",
    version: "1.0.1",
hasPermssion: 0,
credits: "kyle", 
description: "no prefix",
commandCategory: "No command marks needed",
usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
var { threadID, messageID } = event;
if (event.body.indexOf("prefix")==0 || (event.body.indexOf("Prefix")==0 || (event.body.indexOf("Ano prefix")==0 || (event.body.indexOf("ano prefix")==0)))) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
var msg = {
body: `𝖧𝖾𝗅𝗅𝗈 𝖹𝖾𝗇𝗉𝖺𝗂 𝗜 𝗮𝗺 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻𝗮𝗹 𝗕𝗼𝘁 𝗆𝖺𝖽𝖾 𝖡𝗒 https://www.facebook.com/kyledev03 my 𝗣𝗿𝗲𝗳𝗶𝘅 𝗶𝘀: 【 ${global.config.PREFIX} 】`
}
api.sendMessage(msg, threadID, messageID);
}
}
module.exports.run = function({ api, event, client, __GLOBAL }) {

}
