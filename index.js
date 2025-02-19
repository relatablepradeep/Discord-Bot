const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv=require('dotenv')

const OpenAI = require("openai");




//creating my client- this is my virtual client through which i will interact with my server
//intends-what type of permission you are giving to them
//guilds-update,edit etc

dotenv.config();

const Token=process.env.Token;


const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, //tells abut every single message send inside server
        GatewayIntentBits.MessageContent //  read message content
    ] 
});



//creating a listner 
//messageCreate will give access to message object 

client.on(Events.MessageCreate, async (message) => {

    if(message.author.bot) return;
    if(message.channel.id !==process.env.channel_id) return ;

    //like not every time mybot should get active 

    if(message.content.startsWith('!')) return;

    if(message.content.startsWith('create')){
        const url=message.content.split('create')[1]
        return message.reply({
            content:'generating short ID for '+url,
        })
    }

    let conversation=[{ role:'system' ,content:'in my absence you have to assiste people whatever they ask about me my name is pradeep chand i am 21 year old , i know react,express, ui/ux libary and many more also only tell these detail when they ask question related to it and tell in his absence you will guid them'}]


    console.log(message.content);
    // console.log(message) information about message sender reciver
    message.reply({
        content:'hey me to.....'   //now it will propgate multiple times beacuse it answering itself also
    })


    conversation.push({

        role:'user',
        content:message.content,
    });

    //prentend that our bot is typing

    await message.channel.sendTyping();

    const result=await openai.chat.completions.create({

        model:'gpt-3.5-turbo',
        messages:conversation


    })

    message.reply(result.data.choices[0].message)
});

//Making my own command

const  openai = new OpenAI({

    apiKey:process.env.API_KEY,




})


client.on('interactionCreate',(interaction)=>{
    console.log(interaction);

    interaction.reply('Maybe You Will lose Many times but Dont make it a habit'); //if you send if /ping i will will send you this
})


client.login(Token)