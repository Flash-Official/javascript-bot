const path = require('path');
const getAllFiles = require('../utils/getAllFiles');
const { messageLink } = require('discord.js');
let objectArray = [];
module.exports = (client) => {
  /**
 *
 * @param {Client} client
 * @param {Interaction} interaction
 */
  
  
  
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
      const fs = require('fs');
      const sqlite3 = require('sqlite3').verbose();

      const dbFile = 'responses.db';

      

      const db = new sqlite3.Database(dbFile, (err) => {
          if (err) {
              console.error('Database connection error:', err.message);
          } else {
              fetchAndUpdateObjectArray();
          }
      });
      

      
      


      function fetchAndUpdateObjectArray() {
          db.all('SELECT rowid, calls, responses FROM calls_responses', [], (err, rows) => {
              if (err) {
                  console.error('Error fetching data:', err.message);
                  return;
              }

            
              let newRowsMap = new Map();
              rows.forEach((row) => {
                  newRowsMap.set(row.rowid, { calls: row.calls, responses: row.responses });
              });db

              
              let updatedObjectArray = [];
              newRowsMap.forEach((value, key) => {
                  updatedObjectArray.push(value);
              });

              
              objectArray = updatedObjectArray;

          });
      }


        const POLLING_INTERVAL = 5000;


        setInterval(fetchAndUpdateObjectArray, POLLING_INTERVAL);
              
        });
    
    
  }

  client.on("messageCreate",(msg) => {
    if(msg.author.bot){
        return
    }
    else if(msg.channel.type==1){
      client.channels.cache.get("1247139326584688671").send(`From:${msg.author}\nContent:\`\`\`${msg.content}\`\`\``);

    }
    
    else if(msg.content.toLowerCase().includes("flash")){
        const flash="1105482048656916572"
        if(msg.content.toLowerCase().includes("..")){
        msg.reply(``)
        }
        link=msg.url
        const final=`Content:${msg.content}\nBy:${msg.author}\nLink:${link}`
        let thanos = client.users.fetch(flash);
        thanos.then(function(flashuser) {
          flashuser.send(final)
        });
    }
  loop1:for(let arr of objectArray){
    if(msg.content.toLowerCase().includes(arr.calls)){
      msg.reply(arr.responses)
      break loop1;
    }
  }
});
};