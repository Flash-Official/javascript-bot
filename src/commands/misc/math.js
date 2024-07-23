require('dotenv').config()
const { ApplicationCommandOptionType } = require('discord.js');
const _ = require("lodash");
const {spawn}=require('child_process');
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports={
    name:'question',
    description:'gives answer',
    devOnly:false,
    // testOnly:Boolean,
    options:[
        {
            name:"query",
            description:"the topic of question",
            required:true,
            type:ApplicationCommandOptionType.String,
        }
    ],
    //deleted:Boolean,

    callback:async(client,interaction) =>{
        await interaction.deferReply()
        const q=await interaction.options.get("query").value
        
        const childPython=spawn('python',['wolfram.py',q])

        childPython.stdout.on('data',async(data)=>{
            await interaction.editReply(`Question : \`${capitalize(q)}\`\nAnswer : \`${data.toString()}\``)
        })
        childPython.stderr.on('data',async(data)=>{
            await interaction.editReply(`Question : \`${capitalize(q)}\`\nPlease Try Again!`)
        })
    }

}
