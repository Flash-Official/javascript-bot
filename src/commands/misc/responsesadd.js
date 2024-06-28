const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './responses.db';










const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports={

    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */


    name: 'response-add',
    description: 'adds your name to the response',
    devOnly: false,
    // testOnly:Boolean,
    //options:Object[],
    //deleted:true,
    options:[
        {
            name:'wake-up-word',
            description:'type the text which you want to keep as the wake up word',
            required:true,
            type:ApplicationCommandOptionType.String,
        },
        {
            name:'actual-response',
            required:true,
            description:'the phrase which you want the bot to say',
            type:ApplicationCommandOptionType.String,
        },
    ],
    //deleted:Boolean,
    
    callback:async(client,interaction) =>{
        const dbExists = fs.existsSync(dbFile);
        const db = new sqlite3.Database(dbFile, (err) => {
            if (err) {
                console.error('Database connection error:', err.message);
            } 
        });
        function createTable() {
            db.serialize(() => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS calls_responses (
                        calls TEXT NOT NULL UNIQUE,
                        responses TEXT NOT NULL
                    )
                `, (err) => {
                    if (err) {
                        console.error('Error creating calls_responses table:', err.message);
                    } else {
                        console.log('Calls_Responses table created successfully.');
                    }
                });
            });
        }

        function insertKeyValue(calls, responses) {
            db.run(`
                INSERT INTO calls_responses (calls, responses)
                VALUES (?, ?)
            `, [calls, responses], (err) => {
                if (err) {
                    interaction.reply('The name is already registered')
                } else {
                    interaction.reply('Response added,Try in 10 seconds')
                }
            });
        }
            
            let striker = interaction.options.get('wake-up-word').value;
            striker=striker.toLowerCase()
            const response =interaction.options.get('actual-response').value;
            
                if (dbExists) {
                    createTable();
                } else {
                    console.log('Database file does not exist. Creating new database and table...');
                    fs.openSync(dbFile, 'w');
                    createTable();
                }
            insertKeyValue(striker, response);
            
            
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
        }
        
        
        
    };
