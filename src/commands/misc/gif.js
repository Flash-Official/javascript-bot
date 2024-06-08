require('dotenv').config()
const { ApplicationCommandOptionType } = require('discord.js');
const _ = require("lodash");
module.exports={
    name:'gif',
    description:'gives a gif on the query added',
    devOnly:true,
    // testOnly:Boolean,
    options:[
        {
            name:"query",
            description:"the topic on which you need the gif on",
            required:true,
            type:ApplicationCommandOptionType.String,
        }
    ],
    //deleted:Boolean,

    callback:async(client,interaction) =>{
        const q=await interaction.options.get("query").value
        const key=process.env.GIPHY
        const url=`https://api.giphy.com/v1/gifs/search?&api_key=${key}&q=${q}`
        
        fetch(url) 
    .then(response => response.json())
    .then(data => {
        try {
            if( data['data']){
                const random_gif = _.sample(data['data'])
                const gif_url = random_gif['images']['original']['url']
                interaction.reply({
                    content:gif_url
                })
            }else{
                console.log('No GIFs found for the search term.')
            }
            
        } catch (error) {
            
            console.log(`There was an error:${error}`)
        }
    });
    }

}