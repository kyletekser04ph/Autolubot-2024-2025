const axios = require('axios');

module.exports.config = {
    name: 'ai',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['ai', 'bot'],
    description: 'AI Command',
    usage: 'ai [query]',
    credits: 'Kyle敦. ဗီူ',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const query = args.join(' ');

    if (!query) {
        api.sendMessage('Please provide a question ex:ai what is nigga?.', event.threadID, event.messageID);
        return;
    }

    api.sendMessage('⏱️ 𝙎𝙚𝙖𝙧𝙘𝙝𝙞𝙣𝙜 𝙥𝙡𝙚𝙖𝙨𝙚 𝙬𝙖𝙞𝙩...', event.threadID, event.messageID);

    try {
        
        const aiResponse = await axios.get('https://hercai.onrender.com/v3/hercai', {
            params: { prompt: query, uid: event.senderID }
        });
        const aiData = aiResponse.data.gpt4;

        
        api.getUserInfo(event.senderID, (err, result) => {
            if (err) {
                console.error('Error fetching user info:', err);
                api.sendMessage('An error occurred while fetching the user info.', event.threadID, event.messageID);
                return;
            }

            const userName = result[event.senderID].name;

            // Send the combined response
            const finalResponse = `🤖 𝗔𝗨𝗧𝗢𝗟𝗨𝗕𝗢𝗧𝗩𝟯 (𝗔𝗜)\n\nQuestion asked by: ${userNameTag}\n▬▬▬▬▬▬▬▬▬▬▬▬\n${aiData}\n▬▬▬▬▬▬▬▬▬▬▬▬\n𝑐𝑟𝑒𝑑𝑖𝑡𝑠: Kyle敦. ဗီူ`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        });
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage('An error occurred while fetching the response.', event.threadID, event.messageID);
    }
};
