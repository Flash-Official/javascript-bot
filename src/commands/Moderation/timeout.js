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
    const str=interaction.options.get('duration').value;

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
    await interaction.editReply("That user doesn't exist in this server.");
    return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
    await interaction.editReply(
        "You can't timeout that user because they're the server owner."
    );
    return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; 
    const requestUserRolePosition = interaction.member.roles.highest.position; 
    const botRolePosition = interaction.guild.members.me.roles.highest.position; 

    if (targetUserRolePosition >= requestUserRolePosition) {
    await interaction.editReply(
        "You can't timeout that user because they have the same/higher role than you."
    );
    return;
    }

    if (targetUserRolePosition >= botRolePosition) {
    await interaction.editReply(
        "I can't timeout that user because they have the same/higher role than me."
    );
    return;
}
    let duration;
    const spacecheck = suiii => /\s/.test(suiii);
    const isnum = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)
    let num,timing;
    if (spacecheck(str)){
        const h=str.split(" ")
        num=h[0]
        timing=h[1]
        

    }

    else{
        num=""
        timing=""
        for(let i of str){
            if(isnum(i)){
                
                num+=i

            }else{
                timing+=i
            }


        }
    }

    if(["days","day","d",].includes(timing.toLowerCase())){
        duration=num*24*60*60*1000

    }
    else if(["hours","hour","h"].includes(timing.toLowerCase())){
        duration=num*60*60*1000

    }
    else if(["minutes","min","m","minute"].includes(timing.toLowerCase())){
        durations=num*60*1000
        
    }

    else if(["seconds","second","s","secs"].includes(timing.toLowerCase())){
        duration=num*1000
    }
    
        

    
    try {
    await targetUser.timeout(duration,reason)
    await interaction.editReply(
        `User ${targetUser} was timed-out\nReason: ${reason}`
    );
    } catch (error) {
    console.log(`There was an error when time-ing out: ${error}`);
    }
},

name: 'timeout',
description: 'Time\'s out  a member from this server.',
options: [
    {
    name: 'target-user',
    description: 'The user you want to time-out.',
    type: ApplicationCommandOptionType.Mentionable,
    required: true,
    },
    {
        name:'duration',
        description:'The duration for the time-out',
        type:ApplicationCommandOptionType.String,
        required:true,
    },
    {
    name: 'reason',
    description: 'The reason you want to time-out.',
    type: ApplicationCommandOptionType.String,
    },
],
devOnly:false,
permissionsRequired: [PermissionFlagsBits.BanMembers],
botPermissions: [PermissionFlagsBits.BanMembers],
};