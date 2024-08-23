const axios = require('axios');

module.exports.config = {
	name: "blue",
	version: "1.0.0",
	role: 0,
	credits: "Kyle敦. ဗီူ",
	description: "cmd ai powered by [🤖]—𝗘𝗱𝘂𝗰𝗕𝗼𝘁",
	hasPrefix: false,
	usage:"ai [your content]",
	cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
	const content = encodeURIComponent(args.join(" "));

	if (!content) {
		return api.sendMessage("Please Provide your question with [🤖]—𝗔𝘂𝘁𝗼𝗟𝘂𝗯𝗼𝘁𝘃𝟯", event.threadID, event.messageID);
	}

	api.sendMessage("🔍 𝗘𝗱𝘂𝗰—𝗕𝗼𝘁 is typing please wait...", event.threadID, event.messageID); 

	const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${content}`;

	try {
		const response = await axios.get(apiUrl);
		const reply = response.data.reply;

		api.sendMessage(reply, event.threadID, event.messageID);
	} catch (error) {
		console.error("Error fetching data:", error.message);
		api.sendMessage("An error occurred while processing your request.", event.threadID);
	}
};
