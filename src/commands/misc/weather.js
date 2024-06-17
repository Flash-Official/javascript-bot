require('dotenv').config()
const { ApplicationCommandOptionType } = require('discord.js');
const _ = require("lodash");
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports={
    name:'weather',
    description:'gives the weather details of the query',
    devOnly:false,
    // testOnly:Boolean,
    options:[
        {
            name:"query",
            description:"the place who's weather you wanna check",
            required:true,
            type:ApplicationCommandOptionType.String,
        }
    ],
    //deleted:Boolean,

    callback:async(client,interaction) =>{
        let q=await interaction.options.get("query").value
        const key=process.env.OPENWEATHER
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${key}&units=metric`
        
        fetch(url) 
    .then(response => response.json())
    .then(x=> {
    try {
        const y = x["main"]
    const t = y["temp"]
    const p = y["pressure"]
    const h = y["humidity"]
    const z = x["weather"]
    const weather_description = z[0]["description"]
    const a = `The Temperate details in ${capitalize(q)}:\nTemperature is ${String(t)} degrees Celsius.\nThe atmospheric pressure is ${String(p)} in HPA units.\nThe humidity is ${String(h)} percent.\nThe weather can be described as "${capitalize(String(weather_description))}"`
    interaction.reply({
        content:a,
    })
        
    } catch (error) {
        interaction.reply({
            content:`There was an error in fetching the weather report of the place:"${capitalize(q)}".\nPlease try again`,
        })
        
    }
    
    });
    }

}
