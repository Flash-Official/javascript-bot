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
    const targetUser = await ban.user.fetch();

    if (!targetUser) {
    await interaction.editReply("That user doesn't exist in this server.");
    return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
    await interaction.editReply(
        "You can't unban that user because they're the server owner."
    );
    return;
    }

    const requestUserRolePosition = interaction.member.roles.highest.position; 
    const botRolePosition = interaction.guild.members.me.roles.highest.position; 
    try {
        
        await interaction.guild.members.unban(targetUserId,reason)
        await interaction.editReply(
            `User ${targetUser} was unbanned\nReason: ${reason}`
    );
    } catch (error) {
    console.log(`There was an error when banning: ${error}`);
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