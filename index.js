// Discord bot implements
require("dotenv").config();

const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordChannelID = process.env.DISCORD_CHANNEL_ID;
const discordInactive = process.env.DISCORD_INACTIVE;
const discordTraining = process.env.DISCORD_TRAINING;
const trelloIDList = process.env.TRELLO_ID_LIST_CG;
const trelloIDList2 = process.env.TRELLO_ID_LIST_CG2;
const trelloIDList5 = process.env.TRELLO_ID_LIST_INACTIVE;
const trelloIDList6 = process.env.TRELLO_ID_LIST_TRAINING;

[trelloKey, trelloToken, discordBotToken, discordChannelID, discordInactive, discordTraining, trelloIDList, trelloIDList2, trelloIDList5, trelloIDList6].forEach(i => {
  if (!i) {
    console.log("Token is undefined. Please set .env file. Exit...");
    process.exit(0);
  }
});

const discord = require("discord.js");
const client = new discord.Client();
const Trello = require("node-trello");
const trelloClient = new Trello(trelloKey, trelloToken);
const postTrello = require("./lib/trello/post_trello_CG");
const post2Trello = require("./lib/trello/post_trello_CG2");

function isCommand(command, message){
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith(command);
}


client.on("ready", message => {
  console.log(`${client.user.username} is online in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  let currentActivity = 0
   
   
  setInterval(async () => {
    currentActivity++
    

    if (currentActivity > 2) {
      currentActivity = 0
    }

    switch (currentActivity) {
      case 0:
        client.user.setActivity('[NYCG] Cape May Training Facility')
        break
      case 1:
        client.user.setPresence({ game: { name: 'What does this buttton do? Hmmmm?', type: "streaming", url: "https://www.twitch.tv/icoolp"}}); 
        break
      case 2:
        client.user.setActivity(`${client.users.size} users`, { type: 'WATCHING' })
        break
    }
  }, 10000)
 

  client.user.setActivity('[NYCG] Cape May Training Facility')
});


client.on("message", message => {
  if(message.author.bot) return;
  if (message.channel.id === discordChannelID) {
    
    //SS
    if(isCommand('Section: 1', message)){ 

    postTrello(trelloClient, trelloIDList, message).then((data) => {
      
    
      const dataObject = data;
      const shortUrl = dataObject.shortUrl;
      

      let ssEmbed = new discord.RichEmbed()
      .setColor("#42a7f4")
      .setTitle("Patrol Log Successfully Uploaded!")
      .setDescription("Your log was uploaded to the **Section 1 | Patrol Logs** Trello list.")
      .addField("Link to your log", `${shortUrl}`)
      .setThumbnail("https://cdn.discordapp.com/attachments/472476040317370369/476468504326045716/23download.jpg")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();




      message.delete().catch();
      message.reply().then(msg => {msg.delete(12000)})
      message.channel.send(ssEmbed).then(msg => {msg.delete(12000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
  
    });
  }
  

  if(isCommand('Section: 2', message)){ 
    post2Trello(trelloClient, trelloIDList2, message).then((data) => {
      
    
      const dataObject = data;
      const shortUrl = dataObject.shortUrl;
      

      let ssEmbed = new discord.RichEmbed()
      .setColor("#42a7f4")
      .setTitle("Patrol Log Successfully Uploaded!")
      .setDescription("Your log was uploaded to the **Section 2 | Patrol Logs** Trello list.")
      .addField("Link to your log", `${shortUrl}`)
      .setThumbnail("https://cdn.discordapp.com/attachments/472476040317370369/476468504326045716/23download.jpg")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();




      message.delete().catch();
      message.reply().then(msg => {msg.delete(12000)})
      message.channel.send(ssEmbed).then(msg => {msg.delete(12000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
  
    });
  }


    }
  

  if(message.author.bot) return;
  if (message.channel.id === discordInactive) {
    if(isCommand("Name:", message)){ 
    	
      console.log("gatcha!");
      const postTrello = require("./lib/trello/post_trello_INACTIVE");
         
      postTrello(trelloClient, trelloIDList5, message).then((data) => {
        const dataObject = data;
        const shortUrl = dataObject.shortUrl;
        
  
        let hEmbed = new discord.RichEmbed()
        .setColor("#42a7f4")
        .setTitle("Inactivity Notice was Successfully Uploaded!")
        .setDescription("Your notice was uploaded to the **Inactivity Notice** Trello list.")
        .addField("Link to your notice", `${shortUrl}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/472476040317370369/476468504326045716/23download.jpg")
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
  if (message.channel.id === discordTraining) {
    if(isCommand("Host:", message)){ 
    	
      console.log("gatcha!");
      const postTrello = require("./lib/trello/post_trello_TRAINING");
         
      postTrello(trelloClient, trelloIDList6, message).then((data) => {
        const dataObject = data;
        const shortUrl = dataObject.shortUrl;
        
  
        let hEmbed = new discord.RichEmbed()
        .setColor("#42a7f4")
        .setTitle("Training Log was Successfully Uploaded!")
        .setDescription("Your log was uploaded to the **Training Logs** Trello list.")
        .addField("Link to your log", `${shortUrl}`)
        .setThumbnail("https://cdn.discordapp.com/attachments/472476040317370369/476468504326045716/23download.jpg")
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
    const prefix = "!";
  
    function isCommand2(command, message){
      var command = command.toLowerCase();
      var content = message.content.toLowerCase();
      return content.startsWith(prefix + command);
    }


    if(isCommand2('Mass', message)){
      if(!message.member.roles.some(r=>["Company Commander" ,"Master Chief Petty Officer of the CG" ,"Officer Personnel", "High Command Personnel", "Vice Commandant of the Coast Guard", "Commandant of the Coast Guard", "Commander In Chief"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
          return;
            
          message.channel.send(`@here`)

          var d = new Date,
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');


          let anotherembed = new discord.RichEmbed()

          .setTitle("United States Coast Guard | Automated System")
          .setDescription(`Host: <@${message.channel.id}> \nEvent Type: **Mass Patrol** \nDate: ${d} \nLocation: https://www.roblox.com/games/10524855/Sale-New-York-City`)
          .setColor("#42a7f4")
          .setThumbnail("https://cdn.discordapp.com/attachments/472476040317370369/476468504326045716/23download.jpg");

          messge.channel.semd(anotherembed);
              
        }




        if(isCommand2('Training', message)){
          if(!message.member.roles.some(r=>["Company Commander" ,"Master Chief Petty Officer of the CG" ,"Officer Personnel", "High Command Personnel", "Vice Commandant of the Coast Guard", "Commandant of the Coast Guard", "Commander In Chief"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
              return;
                
              message.channel.send(`@here`)
    
              var d = new Date,
              dformat = [(d.getMonth()+1).padLeft(),
                         d.getDate().padLeft(),
                         d.getFullYear()].join('/') +' ' +
                        [d.getHours().padLeft(),
                         d.getMinutes().padLeft(),
                         d.getSeconds().padLeft()].join(':');
          //=> dformat => '05/17/2012 10:52:21'
    
    
              let another2embed = new discord.RichEmbed()
    
              .setTitle("United States Coast Guard | Automated System")
              .setDescription(`Host: <@${message.channel.id}> \nEvent Type: **Training** \nDate: ${d} \nLocation: https://www.roblox.com/games/863706791/NYCG-Cape-May-Training-Facility`)
              .setColor("#42a7f4")
              .setThumbnail("https://cdn.discordapp.com/attachments/472476040317370369/476468504326045716/23download.jpg");
    
              messge.channel.semd(another2embed);
                  
            }


            if(isCommand2('bt', message)){
              if(!message.member.roles.some(r=>["Company Commander" ,"Master Chief Petty Officer of the CG" ,"Officer Personnel", "High Command Personnel", "Vice Commandant of the Coast Guard", "Commandant of the Coast Guard", "Commander In Chief"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
                  return;

                  let her2eRole = message.guild.roles.find("name", "Coast Guard Recruit");
                    
                  message.channel.send(`${her2eRole}`)
        
                  var d = new Date,
                  dformat = [(d.getMonth()+1).padLeft(),
                             d.getDate().padLeft(),
                             d.getFullYear()].join('/') +' ' +
                            [d.getHours().padLeft(),
                             d.getMinutes().padLeft(),
                             d.getSeconds().padLeft()].join(':');
              //=> dformat => '05/17/2012 10:52:21'
        
        
                  let anotherem2bed = new discord.RichEmbed()
        
                  .setTitle("United States Coast Guard | Automated System")
                  .setDescription(`Host: <@${message.channel.id}> \nEvent Type: **Basic Training** \nDate: ${d} \nLocation: https://www.roblox.com/games/863706791/NYCG-Cape-May-Training-Facility`)
                  .setColor("#42a7f4")
                  .setThumbnail("https://cdn.discordapp.com/attachments/472476040317370369/476468504326045716/23download.jpg");
        
                  messge.channel.semd(anotherem2bed);
                      
                }















                        
 });

client.login(discordBotToken);
