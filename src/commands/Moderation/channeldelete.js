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


    name: 'nuke',
    description: 'Nukes the channel yum yum',
    options: [
    {
        name:'channel',
        description:'the channel which you wanna nuke (scary)',
        required:true,
        type:ApplicationCommandOptionType.Channel,
    },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
    
    callback:async(client,interaction) =>{
        const channel_id=interaction.options.get('channel').value
        await interaction.deferReply();
        sleep(10)
        channel=client.channels.cache.get(channel_id)
        await channel.delete()
        setTimeout(() => {
            client.channels.cache.get('1273347547938820253').send(`Deleted Channel:"${channel.name}"`)
        }, 5000);
    }

};