const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
/**
 *
 * @param {Client} client
 * @param {Interaction} interaction
 */

callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('user-id').value;
    const reason =
    interaction.options.get('reason')?.value || 'No reason provided';
    await interaction.deferReply();
    
    
    const ban=await interaction.guild.bans.fetch(targetUserId)
    console.log(ban);
    const targetUser = await ban.user.fetch();
    console.log(targetUser)

    if (!targetUser) {
        await interaction.editReply("That user is either not banned or wasn't in the guild");
        return;
    }
    

    try {
        
        await interaction.guild.members.unban(targetUserId,reason)
        await interaction.editReply(
            `User ${targetUser} was unbanned\nReason: ${reason}`
    );
    } catch (error) {
    console.log(`There was an error when banning: ${error}`);
    await interaction.editReply("That user is either not banned or wasn't in the guild");
        
    }
},

name: 'unban',
description: 'unbans a member from this server.',
options: [
    {
    name: 'user-id',
    description: 'The UserID of the member you want to unban.',
    type: ApplicationCommandOptionType.String,
    required: true,
    },
    {
    name: 'reason',
    description: 'The reason you want to unban.',
    type: ApplicationCommandOptionType.String,
    },
],
deleted:false,
permissionsRequired: [PermissionFlagsBits.BanMembers],
botPermissions: [PermissionFlagsBits.BanMembers],
};