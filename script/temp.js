const axios = require('axios');

module.exports.config = {
    name: "temp",
    version: "1.0.0",
    role: 0,
    credits: "kyle",
    description: "Generate a temporary email",
    hasPrefix: false,
    aliases: ["genTempEmail", "gentemp"],
    usage: "[genTempEmail]",
    cooldown: 5
};

module.exports.run = async function({ api, event }) {
    try {
        const apiUrl = 'https://markdevs-last-api-as2j.onrender.com/api/gen';
        const response = await axios.get(apiUrl);

        const email = response.data.email;
        if (!email) {
            return api.sendMessage("Failed to generate a temporary email. Please try again.", event.threadID);
        }

        const message = `💁🏻‍♂️ Generated 𝗧𝗲𝗺𝗽𝗼𝗿𝗮𝗿𝘆 𝗘𝗺𝗮𝗶𝗹: ${email}\n\nℹ️ Please use the 'checkinbox' command to see your temp email inbox.`;
        api.sendMessage(message, event.threadID);

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while generating the temporary email.", event.threadID);
    }
};
