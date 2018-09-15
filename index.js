// Discord bot implements
require("dotenv").config();

const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordChannelID = process.env.DISCORD_CHANNEL_ID;
const discordInactive = process.env.DISCORD_INACTIVE;
const discordComplaints = process.env.DISCORD_COMPAINTS;
const trelloIDList = process.env.TRELLO_ID_LIST_SS;
const trelloIDList2 = process.env.TRELLO_ID_LIST_SRT;
const trelloIDList3 = process.env.TRELLO_ID_LIST_FPS;
const trelloIDList4 = process.env.TRELLO_ID_LIST_HSI;
const trelloIDList5 = process.env.TRELLO_ID_LIST_INACTIVE;

[trelloKey, trelloToken, discordBotToken, discordChannelID, discordInactive, discordComplaints, trelloIDList, trelloIDList2, trelloIDList3, trelloIDList4, trelloIDList5].forEach(i => {
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
  console.log(`${client.user.username} is online in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  client.user.setActivity(`${client.users.size} users`, {type: "WATCHING"});
});


function isCommand(command, message){
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith(command);
}


client.on("message", message => {
  if(message.author.bot) return;
  if (message.channel.id === discordChannelID) {

    if(isCommand('main', message)){
      if(message.author.id !== ("236238325306884096")) return;


      message.delete().catch();

      let raskj = new discord.RichEmbed()
      .setImage("https://cdn.discordapp.com/attachments/490607262188961824/490617665040416788/DHS_Under_Maintenance.jpg")
      .setColor("#ccccdd");

      message.channel.send(raskj);
      
    }

    if(isCommand('format', message)){
      if(message.author.id !== ("236238325306884096")) return;


      message.delete().catch();

      let raskj6 = new discord.RichEmbed()
      .setTitle("Patrol Logs Format")
      .setDescription("The following format **MUST** be followed in-order for your Patrol Log to be logged into the Trello.")
      .addField("  Division: \nUsername: \nPatrol Screenshot: \nDate: \nStart Time: \nEnd Time:", " • Keep in mind, division abbreviations **MUST** be used [SS, FPS, SRT, HSI]. \n • Links will **ONLY** be accepted for patrol screenshots. \n • The format only has to be in the order provided, capitalization will not affect the logging process.")
      .setColor("#ccccdd")
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")

      message.channel.send(raskj6);
      
    }
    
    //SS
    if(isCommand('DIVISION: SS', message)){ 

    postTrello(trelloClient, trelloIDList, message).then((data) => {
      
    
      const dataObject = data;
      const shortUrl = dataObject.shortUrl;
      

      let ssEmbed = new discord.RichEmbed()
      .setColor("#3465ed")
      .setTitle("Patrol Log Successfully Uploaded!")
      .setDescription("Your log was uploaded to the **Secret Service** Trello list.")
      .addField("Link to your log", `${shortUrl}`)
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();




      message.delete().catch();
      message.reply().then(msg => {msg.delete(12000)})
      message.channel.send(ssEmbed).then(msg => {msg.delete(12000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
  
    });
  }
    //SRT
    if(isCommand('DIVISION: SRT', message)){ 
    
    const postTrello = require("./lib/trello/post_trello_SRT");
       
    postTrello(trelloClient, trelloIDList2, message).then((data) => {
      const dataObject = data;
      const shortUrl = dataObject.shortUrl;
      

      let srtEmbed = new discord.RichEmbed()
      .setColor("#3465ed")
      .setTitle("Patrol Log Successfully Uploaded!")
      .setDescription("Your log was uploaded to the **Special Responce Team** Trello list.")
      .addField("Link to your log", `${shortUrl}`)
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();
  
      message.delete().catch();
      message.reply().then(msg => {msg.delete(12000)})
     message.channel.send(srtEmbed).then(msg => {msg.delete(12000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
    });
    }
      
    //FPS
    if(isCommand('DIVISION: FPS', message)){ 
    	
      
      const postTrello = require("./lib/trello/post_trello_FPS");
             
      postTrello(trelloClient, trelloIDList3, message).then((data) => {
      const dataObject = data;
      const shortUrl = dataObject.shortUrl;
      

      let fpsEmbed = new discord.RichEmbed()
      .setColor("#3465ed")
      .setTitle("Patrol Log Successfully Uploaded!")
      .setDescription("Your log was uploaded to the **Federal Protective Service** Trello list.")
      .addField("Link to your log", `${shortUrl}`)
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();
        
        message.delete().catch();
        message.reply().then(msg => {msg.delete(12000)})
        message.channel.send(fpsEmbed).then(msg => {msg.delete(12000)})
            
        }).catch((err) => {
          console.log(`FAILED!: ${err}`);
      });
      }


      //HSI
      if(isCommand('DIVISION: HSI', message)){ 
    	
          
          const postTrello = require("./lib/trello/post_trello_HSI");
             
          postTrello(trelloClient, trelloIDList4, message).then((data) => {
            const dataObject = data;
            const shortUrl = dataObject.shortUrl;
            
      
            let hsiEmbed = new discord.RichEmbed()
            .setColor("#3465ed")
            .setTitle("Patrol Log Successfully Uploaded!")
            .setDescription("Your log was uploaded to the **Intelligence Office** Trello list.")
            .addField("Link to your log", `${shortUrl}`)
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();
      
            
        //Intelligence Office
            message.delete().catch();
            message.reply().then(msg => {msg.delete(12000)})
           message.channel.send(hsiEmbed).then(msg => {msg.delete(12000)})
            
          }).catch((err) => {
            console.log(`FAILED!: ${err}`);
          });
        }
    }
  if(message.author.bot) return;
  if (message.channel.id === discordInactive) {

    if(isCommand('formatinac', message)){
      if(message.author.id !== ("236238325306884096")) return;


      message.delete().catch();

      let raskj64 = new discord.RichEmbed()
      .setTitle("Inactivity Notice Format")
      .setDescription("The following format **MUST** be followed in-order for your Inactivity Notice to be logged into the Trello.")
      .addField("Username: \nRank: \nReason: \nDate of Leave: \nDate of Return \nNote:", "**Please Note:** The format only has to be in the order provided, capitalization will not affect the logging process.")
      .setColor("#ccccdd")
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")

      message.channel.send(raskj64);
      
    }
    if(isCommand('Name:', message)){ 
    	
      console.log("gatcha!");
      const postTrello = require("./lib/trello/post_trello_INACTIVE");
         
      postTrello(trelloClient, trelloIDList5, message).then((data) => {
        const dataObject = data;
        const shortUrl = dataObject.shortUrl;
        
  
        let hEmbed = new discord.RichEmbed()
        .setColor("#3465ed")
        .setTitle("Inactivity Notice was Successfully Uploaded!")
        .setDescription("Your notice was uploaded to the **Inactivity Notice** Trello list.")
        .addField("Link to your notice", `${shortUrl}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp();
    
        message.delete().catch();
        message.reply().then(msg => {msg.delete(12000)})
       message.channel.send(hEmbed).then(msg => {msg.delete(12000)})
        
      }).catch((err) => {
        console.log(`FAILED!: ${err}`);
      });
    }
  }

  if(message.author.bot) return;
  if (message.channel.id === discordComplaints) {


    if (message.content.startsWith("Username:")) return;

    message.delete().catch();
    
  }

                        
 });

client.login(discordBotToken);
