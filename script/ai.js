module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Hey I'm 𝗘𝗗𝗨𝗖 𝗕𝗢𝗧 your virtual assistant 🤖, ask you a question and I'll do my best to answer it.`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`👨🏻‍🏫 Searching "${input}" please wait ....💁`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://soyeon-api.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(`🤖 𝗘𝗗𝗨𝗖-𝗕𝗢𝗧(𝗔.𝗜)\n▬▬▬▬▬▬▬▬▬▬▬▬\n ${response}`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('❌ | Error in searching your question:(', event.threadID, event.messageID);
  }
};
