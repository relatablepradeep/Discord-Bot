

const {REST, Routes}  = require('discord.js');

const dotenv=require('dotenv')
dotenv.config();
const Token=process.env.Token;



const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
  ];


  
  async function registerCommands() {
    const rest = new REST({ version: '10' }).setToken(Token);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands('1341480736535871538'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}


registerCommands();