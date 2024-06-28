const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
let objectArrayupdated=[];
const dbFile = 'responses.db';
const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');
const { log } = require('console');
module.exports={

    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */


    name: 'list-show',
    description: 'shows the active list',
    devOnly: true,
    // testOnly:Boolean,
    //options:Object[],
    //deleted:true,
    options:[],
    //deleted:Boolean,
    
    callback:async(client,interaction) =>{
        const db = new sqlite3.Database(dbFile, (err) => {
            if (err) {
                console.error('Database connection error:', err.message);
            } else {
                console.log('Connected to the SQLite database.');
                fetchAndUpdateObjectArray()
            }
        });
        let objectArray=[];
    function fetchAndUpdateObjectArray() {
        db.all('SELECT calls, responses FROM calls_responses', [], (err, rows) => {
            if (err) {
                console.error('Error fetching data:', err.message);
                return;
            }

            rows.forEach((row)=>{
                objectArray.push({calls:row.calls,responses:row.responses})
            });
            let t=''
            let c=0
            for(let arr of objectArray){
                c+=1
                t+=`${c} ) ${arr.calls} \\|\\|  ${arr.responses}\n `

            }
            interaction.reply(t)
        
        });
    
    }












    }

    };
