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


    name: 'banner',
    description: 'sends the users banner',
    devOnly: false,
    // testOnly:Boolean,
    //options:Object[],
    //deleted:true,
    options:[
        {
            name:'user',
            description:"the user who's banner you want",
            required:false,
            type:ApplicationCommandOptionType.User,
        },
    ],
    //deleted:Boolean,

    callback:async(client,interaction) =>{
        if(!await interaction.options.getUser("user")){
            usero=await interaction.user.fetch()
        }else{
            usero=await interaction.options.getUser("user").fetch()
        }
        const avatarurl=usero.bannerURL({ dynamic : true , size : 2048 })
        if(!avatarurl){ 
            interaction.reply({
                content:"The user doesn't have a banner!",
                ephemeral:true,
            })
        }else{
            interaction.reply({
                content:avatarurl,
                ephemeral:false,
                
            })

        }
        
        


        
    }

};