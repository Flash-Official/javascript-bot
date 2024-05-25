const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
    RoleFlagsBitField,
} = require('discord.js');

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

module.exports={

    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */


    name: 'avatar',
    description: 'sends the user avatar',
    devOnly: false,
    // testOnly:Boolean,
    //options:Object[],
    //deleted:true,
    options:[
        {
            name:'user',
            description:"the user who's avatar you want",
            required:false,
            type:ApplicationCommandOptionType.User,
        },
    ],
    //deleted:Boolean,

    callback:async(client,interaction) =>{
        const usero = interaction.options.get('user')?.value||interaction.user;
        let thanos = client.users.fetch(usero)
        if (isNumber(usero)){
            thanos.then(function(result1) {
                imgURL = result1.displayAvatarURL({size: 2048})
                interaction.reply({
                    content: imgURL,
                    ephemeral: false,
        
            })
            });

        }else {
            const avatarurl=usero.displayAvatarURL({size: 2048})
                interaction.reply({
                content:avatarurl,
                ephemeral:false,
                
            })
        }
        


        
    }

};