const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const OpenAI = require("openai");

dotenv.config();

const Token = process.env.Token;

// Initialize OpenAI (DeepSeek API)
const openai = new OpenAI({
    apiKey: process.env.API_KEY, // Use DeepSeek API key
    baseURL: 'https://api.deepseek.com/v1', // DeepSeek's API base URL
});

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ] 
});

// Listen for messages
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.channel_id) return;
    if (message.content.startsWith('!')) return;

    if (message.content.startsWith('create')) {
        const url = message.content.split('create')[1];
        return message.reply({ content: `Generating short ID for ${url}` });
    }

    let conversation = [
        { role: 'system', content: 'In my absence, you have to assist people. If they ask, tell them my name is Pradeep Chand, I am 21 years old, and I know React, Express, UI/UX libraries, and more. Only provide these details when specifically asked.' }
    ];

    conversation.push({
        role: 'user',
        content: message.content,
    });

    await message.channel.sendTyping();

    try {
        const result = await openai.chat.completions.create({
            model: 'deepseek-chat', // Use DeepSeek's model
            messages: conversation
        });

        message.reply(result.choices[0].message.content); // Corrected response structure
    } catch (error) {
        console.error("Error fetching response:", error);
        message.reply("Sorry, I couldn't process your request , because my owner forget to purchase my credit but you can type /ping to get something");
    }
});

// Handle Slash Commands
client.on('interactionCreate', (interaction) => {
    console.log(interaction);
    interaction.reply('Maybe you will lose many times, but don’t make it a habit.');
});

// Login to Discord
client.login(Token);
