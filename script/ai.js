const axios = require('axios');

module.exports = {
  config: {
    name: 'ai',
    description: 'Interact with the new AI model via the SamirXPikachu API using text prompts only',
    usage: 'ai [custom prompt]',
    cooldown: 3,
    accessableby: 0,
    category: 'Utility',
    prefix: false,
    author: 'kylepogi',
    version: '1.0.0',
  },
  start: async function ({ api, event, text, react, reply }) {
    const customPrompt = text.join(' ');

    if (!customPrompt) {
      return reply('Please provide a question ex: ai what is love');
    }

    // Construct the API URL using the provided prompt
    const apiUrl = `https://www.samirxpikachu.run.place/multi/Ml?model=Mixtral-8x22B-Instruct-v0.1&prompt=${encodeURIComponent(customPrompt)}`;

    // Add the initial processing reaction
    await react('⏳'); 

    // Send a processing message
    const initialMessage = await new Promise((resolve, reject) => {
      api.sendMessage({
        body: '🤖 𝗘𝗗𝗨𝗖 𝗕𝗢𝗧: 🔍Processing your request...',
        mentions: [{ tag: event.senderID, id: event.senderID }],
      }, event.threadID, (err, info) => {
        if (err) return reject(err);
        resolve(info);
      });
    });

    try {
      // Make the API request
      const response = await axios.get(apiUrl);
      const aiResponse = response.data.response || response.data; // Adjust based on actual response

      // Format the response
      const formattedResponse = `
👨🏻‍🏫 𝗘𝗗𝗨𝗖 𝗕𝗢𝗧 𝖱𝖤𝖲𝖯𝖮𝖭𝖲𝖤:
━━━━━━━━━━━━━━━━━━
${aiResponse.trim()}`;

      // React with a checkmark for success
      await react('✅'); 
      
      // Edit the initial message to include the AI's response
      await api.editMessage(formattedResponse.trim(), initialMessage.messageID);

    } catch (error) {
      console.error('Error:', error);

      // In case of an error, notify the user
      await api.editMessage('An error occurred, please try again.', initialMessage.messageID);
    }
  }
};
