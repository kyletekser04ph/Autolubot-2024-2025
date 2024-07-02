const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "dalle",
    version: "1.0.0",
    credits: "Kyle",
    description: "Generate images",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["dalle"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let chilli = args.join(" ");
        if (!chilli) {
            return api.sendMessage("[ ❗ ] - Missing prompt for the DALL-E command", event.threadID, event.messageID);
        }

        api.sendMessage("Generating image, please wait...", event.threadID, async (err, info) => {
            if (err) {
                console.error(err);
                return api.sendMessage("An error occurred while processing your request.", event.threadID);
            }

            try {
                const pogi = await axios.get(`https://joshweb.click/dalle?prompt=${encodeURIComponent(chilli)}`, { responseType: 'arraybuffer' });
                const imagePath = path.join(__dirname, "dalle_image.png");
                
                fs.writeFileSync(imagePath, pogi.data);

                const poganda = await api.getUserInfo(event.senderID);
                const requesterName = poganda[event.senderID].name;

                api.sendMessage({
                    body: `🖼 |𝗛𝗲𝗿𝗲 𝗶𝘀 𝘁𝗵𝗲 𝗶𝗺𝗮𝗴𝗲 𝘆𝗼𝘂 𝗿𝗲𝗾𝘂𝗲𝘀𝘁𝗲𝗱:\n▬▬▬▬▬▬▬▬▬▬▬▬\n𝗣𝗿𝗼𝗺𝗽𝘁: ${chilli}\n\n𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝗲𝗱 𝗯𝘆: ${requesterName}\n▬▬▬▬▬▬▬▬▬▬▬▬`,
                    attachment: fs.createReadStream(imagePath)
                }, event.threadID, () => {
                    fs.unlinkSync(imagePath);
                });
            } catch (mantika) {
                console.error(mantika);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (mantika) {
        console.error("Error in DALL-E command:", mantika);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
