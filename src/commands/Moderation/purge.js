const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


module.exports = {
/**
 *
 * @param {Client} client
 * @param {Interaction} interaction
 */

callback: async (client, interaction) => {
    const amount = interaction.options.get('number').value;
    let channelid =interaction.options.get('channel')?.value;

    let Channel;
    if(isNumber(channelid)){
        Channel=client.channels.cache.get(channelid)
    }else{
        Channel=interaction.channel

        channelid=interaction.channel.id
    }
    if(amount>=100){
        interaction.reply({
            content:`The max number of messages deleted should be 100\nInput was ${amount}`,
            ephemeral:false,
        })
        return;
    }
    
    try {
        Channel.bulkDelete(amount)
        interaction.reply({
            content:`Deleted ${amount} messages in the channel <#${channelid}> `,
            ephemeral:false,
        })

    } catch (error) {
    console.log(`There was an error when purging: ${error}`);
    }
},

name: 'purge',
description: 'mass deletes messages (scary)',
options: [
    {
    name: 'number',
    description: 'Input an integer',
    type: ApplicationCommandOptionType.String,
    required: true,
    },
    {
    name: 'channel',
    description: 'Leave empty if the command in run in the same channel',
    type: ApplicationCommandOptionType.Channel,
    },
    
],
devOnly:false,
permissionsRequired: [PermissionFlagsBits.Administrator],
botPermissions: [PermissionFlagsBits.Administrator],
};