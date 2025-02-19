const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv=require('dotenv')




//creating my client- this is my virtual client through which i will interact with my server
//intends-what type of permission you are giving to them
//guilds-update,edit etc

dotenv.config();

const Token=process.env.Token;


const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent // Needed to read message content
    ] 
});



//creating a listner 

client.on(Events.MessageCreate, message => {

    if(message.author.bot) return;

    if(message.content.startsWith('create')){
        const url=message.content.split('create')[1]
        return message.reply({
            content:'generating short ID for '+url,
        })
    }


    console.log(message.content);
    // console.log(message)
    message.reply({
        content:'hey me to.....'   //now it will propgate multiple times beacuse it answering itself also
    })
});

//Making my own command


client.on('interactionCreate',(interaction)=>{
    console.log(interaction);

    interaction.reply('Maybe You Will lose Many times but Dont make it a habit'); //if you send if /ping i will will send you this
})


client.login(Token)