const axios = require("axios");

module.exports.config = {
    name: "educ",
    version: "1.0.0",
    role: 0,
    credits: "kyle",
    description: "Fetch a response from GPT-4",
    hasPrefix: true,
    aliases: ["gpt", "gpt4response"],
    usage: "[educ <prompt>]",
    cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        // Check if a prompt is provided
        if (args.length === 0) {
            api.sendMessage("ℹ️ Please provide a prompt:\n❗example: educ Hi there. how are you?", event.threadID);
            return;
        }

        const prompt = args.join(" ");

        // Inform the user that the fetching process has started
        const initialMessage = await api.sendMessage("𝙶𝙿𝚃4 𝙰𝙽𝚂𝚆𝙴𝚁𝙸𝙽𝙶...", event.threadID);

        // Fetch the response from the GPT-4 API
        const response = await axios.get(`https://joshweb.click/gpt4?prompt=${encodeURIComponent(prompt)}&uid=100`);
        const gpt4Response = response.data.gpt4;

        // Check if the response contains valid data
        if (!gpt4Response) {
            api.sendMessage("No response found from GPT-4.", event.threadID);
            return;
        }

        // Format the response message
        const message = `🖋 𝗘𝗗𝗨𝗖 |𝙶𝙿𝚃4 𝚃𝚄𝚁𝙱𝙾 \n━━━━━━━━━━━━━━━━━━\n${gpt4Response}\n━━━━━━━━━━━━━━━━━━\n- GPT-4`;

        // Edit the initial message to show the final response
        await api.editMessage(message, initialMessage.messageID);

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while processing the request.", event.threadID);
    }
};
