// Discord bot implements
require("dotenv").config();

const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordChannelID = process.env.DISCORD_CHANNEL_ID;
const trelloIDList = process.env.TRELLO_ID_LIST_SS;
const trelloIDList2 = process.env.TRELLO_ID_LIST_SRT;
const trelloIDList3 = process.env.TRELLO_ID_LIST_FPS;
const trelloIDList4 = process.env.TRELLO_ID_LIST_IO;


[trelloKey, trelloToken, discordBotToken, discordChannelID, trelloIDList, trelloIDList2, trelloIDList3, trelloIDList4].forEach(i => {
  if (!i) {
    console.log("Token is undefined. Please set .env file. Exit...");
    process.exit(0);
  }
});

const discord = require("discord.js");
const client = new discord.Client();
const Trello = require("node-trello");
const trelloClient = new Trello(trelloKey, trelloToken);
const postTrello = require("./lib/trello/post_trello_SS");

client.on("ready", message => {
  console.log("bot is ready, stand by...");
});

client.on("message", message => {
  if(message.author.bot) return;
  if (message.channel.id === discordChannelID) {
    
    if (message.content.startsWith("SS")) {
    	
    console.log("gatcha!");

    postTrello(trelloClient, trelloIDList, message).then((data) => {
      console.log(`SUCCESS!: ${JSON.stringify(data)}`);
  
      message.delete().catch();
      message.reply("SUCCESS! Patrol log posted!").then(msg => {msg.delete(9000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
      
    if (message.content.startsWith("SRT")) {
    	
    console.log("gatcha!");
    const postTrello = require("./lib/trello/post_trello_SRT");
       
    postTrello(trelloClient, trelloIDList2, message).then((data) => {
      console.log(`SUCCESS!: ${JSON.stringify(data)}`);
  
      message.delete().catch();
      message.reply("SUCCESS! Patrol log posted!").then(msg => {msg.delete(9000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
   
    });
   }
    }
  }
});

client.login(discordBotToken);
