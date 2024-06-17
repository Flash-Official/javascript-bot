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


    name: 'echo',
    description: 'says the text which you type',
    devOnly: false,
    // testOnly:Boolean,
    //options:Object[],
    //deleted:true,
    options:[
        {
            name:'text',
            description:'type the text which you want to say',
            required:true,
            type:ApplicationCommandOptionType.String,
        },
        {
            name:'channel',
            description:'the channel where you want to send this message',
            type:ApplicationCommandOptionType.Channel,
        },
    ],
    //deleted:Boolean,
    
    callback:async(client,interaction) =>{
        
        const message = interaction.options.get('text').value;
        const channelss =
        interaction.options.get('channel')?.value || interaction.channel.id;
        interaction.reply({
            content: "The message has been sent",
            ephemeral: true,
        })
        await client.channels.cache.get(channelss).sendTyping();
        
        setTimeout(() => {
            client.channels.cache.get(channelss).send(message)
        }, 5000);
        
    }

};