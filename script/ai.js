const axios = require('axios');
const moment = require('moment-timezone');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['snow', 'ai'],
  description: "An AI command powered by Snowflakes AI",
  usage: "snowflakes [prompt]",
  credits: 'Kylepogi',//modified by joshua Apostol
  cooldown: 3,
};
 
module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  const timeString = moment.tz('Asia/Manila').format('LLL');
 
  if (!input) {
    api.sendMessage(`𝗔𝗜 𝗚𝗣𝗧\n\n💁🏻‍♂️ Please provide a question/query.`, event.threadID, event.messageID);
    return;
  }
 
  api.sendMessage(`🔍𝘀𝗲𝗮𝗿𝗰𝗵𝗶𝗻𝗴....`, event.threadID, event.messageID);
 
  try {
    const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
    if (data.response) {
      api.sendMessage(`𝗔𝗜 𝗚𝗣𝗧\n━━━━━━━━━━━━━━━\n\n${data.response}\n\n${timeString}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('No response found.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
