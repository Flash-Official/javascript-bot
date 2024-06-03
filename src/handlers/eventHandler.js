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
    else if(msg.channel.type==1){
      client.channels.cache.get("1247139326584688671").send(`From:${msg.author}\nContent:\`\`\`${msg.content}\`\`\``);

    }
    else if(msg.content.toLowerCase().includes("your bot")) {
        msg.reply("Talking about me?\nYoung lads")
    }
    else if(msg.content.toLowerCase().includes("flash")){
        const flash="1105482048656916572"
        msg.reply(`Are you talking about Flash, the hot daddy? :hot_face: :speaking_head: :fire: :fire: :yum: `)
        link=msg.messageLink
    }
    else if(msg.content.toLowerCase().includes("shaunie")){
      msg.reply("Are you talking about Shaunie,the sexy man? :speaking_head: :fire:")
    }
    else if(msg.content.toLowerCase().includes("sentient")){
      msg.reply("Are you talking about sentient,the child lover? 👶💋")
    }
    else if(msg.content.toLowerCase().includes("astra")){
      msg.reply("Are you talking about Astra,the black nigger? 👽👺👹🤢🤮🫨👤😈")
    }
    else if(msg.content.toLowerCase().includes("aasakt")){
      msg.reply("Are you talking about Aasakt,Milky boy, bahar se safed andar se kala and taller than flash ? :rage: :pray: :yum: :speaking_head: :fire: ")
    }

});
};