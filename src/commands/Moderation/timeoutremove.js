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
    const targetUserId = interaction.options.get('target-user').value;
    const reason =interaction.options.get('reason')?.value || 'No reason provided';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
    await interaction.editReply("That user doesn't exist in this server.");
    return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
    await interaction.editReply(
        "You can't remove the timeout of that user because they're the server owner."
    );
    return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; 
    const requestUserRolePosition = interaction.member.roles.highest.position; 
    const botRolePosition = interaction.guild.members.me.roles.highest.position; 

    if (targetUserRolePosition >= requestUserRolePosition) {
    await interaction.editReply(
        "You can't remove the timeout of that user because they have the same/higher role than you."
    );
    return;
    }

    if (targetUserRolePosition >= botRolePosition) {
    await interaction.editReply(
        "I can't remove the timeout of that user because they have the same/higher role than me."
    );
    return;
}
    try {
    await targetUser.timeout(null,reason)
    await interaction.editReply(
        `User ${targetUser}'s time-out was removed\nReason: ${reason}`
    );
    } catch (error) {
    console.log(`There was an error when untime-ing out: ${error}`);
    }
},

name: 'timeout-remove',
description: 'removes Time-out from a member from this server.',
options: [
    {
    name: 'target-user',
    description: 'The user whose time out you wanna remove',
    type: ApplicationCommandOptionType.Mentionable,
    required: true,
    },
    {
    name: 'reason',
    description: 'The reason you want to remove time-out for.',
    type: ApplicationCommandOptionType.String,
    },
],
devOnly:true,
permissionsRequired: [PermissionFlagsBits.BanMembers],
botPermissions: [PermissionFlagsBits.BanMembers],
};