require('dotenv').config()
const {Client,IntentsBitField, Guild, InteractionType,GatewayIntentBits,Partials}=require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client=new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,

    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

eventHandler(client);


client.login(process.env.TOKEN);