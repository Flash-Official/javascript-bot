const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './responses.db';
const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');
module.exports={

    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */


    name: 'response-delete',
    description: 'removes your name from responses',
    devOnly: true,
    // testOnly:Boolean,
    //options:Object[],
    //deleted:true,
    options:[
        {
            name:'wake-up-word',
            description:'type the text which you kept as the wakeup text',
            required:true,
            type:ApplicationCommandOptionType.String,
        },
    ],
    //deleted:Boolean,
    
    callback:async(client,interaction) =>{
        var db = new sqlite3.Database(dbFile, function(err) {
        if (err) {
            console.error('Could not open database', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
        });
        function deleteValue(valueToDelete, callback) {
        var sql = 'DELETE FROM calls_responses WHERE calls = ?';

        db.run(sql, [valueToDelete], function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, this.changes);
            }
        });
        }
            let striker = interaction.options.get('wake-up-word').value;
            striker=striker.toLowerCase()
            deleteValue(striker, function(err, changes) {
                if (err) {
                    console.error('Error deleting value:', err);
                } else if (changes > 0) {
                    console.log('Deleted ' + changes + ' row(s) with value: 123');
                } else {
                    console.log('No row found with value: 123');
                }
            db.close(function(err) {
                if (err) {
                    console.error('Error closing database', err.message);
                } else {
                    console.log('Closed the database connection.');
                }
            });
        });
        interaction.reply('deleted check')
        }
    };
