const path = require('path');
const getAllFiles = require('../utils/getAllFiles');
const { messageLink } = require('discord.js');

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
    
  }
  client.on("messageCreate",(msg) => {
    if(msg.author.bot){
        return
    }
    if(msg.channel.type==1){
      client.channels.cache.get("1247139326584688671").send(`From:${msg.author}\nContent:\`\`\`${msg.content}\`\`\``);

    }
    if(msg.content.toLowerCase().includes("your bot")) {
        msg.reply("Hey!")
    }
    if(msg.content.toLowerCase().includes("flash")){
        const flash="1105482048656916572"
        msg.reply(`Are you talking about Flash, the hot daddy?`)
        link=msg.messageLink
    }
    if(msg.content.toLowerCase().includes("shaunie")){
      msg.reply("Are you talking about Shaunie,the sexy man? :speaking_head: :fire:")
    }
    if(msg.content.toLowerCase().includes("sentient")){
      msg.reply("Are you talking about sentient,the child lover? 👶💋")
    }
    if(msg.content.toLowerCase().includes("astra")){
      msg.reply("Are you talking about Astra,the black nigger? 👽👺👹🤢🤮🫨👤😈")
    }
    
});
};