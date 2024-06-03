const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

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
    if(msg.content.toLowerCase().includes("hello")) {
        msg.reply("Hey!")
    }
    if(msg.content.toLowerCase().includes("flash")){
        const flash="1105482048656916572"
        msg.reply(`<@${flash}>,The Creator,maybe he is here`)
    }
    
});
};