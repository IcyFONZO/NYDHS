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
const roblox = require('roblox-js');
const password = process.env.ROBLOX_PASSWORD

roblox.login({username: "NYDHS_BOT", password: password}).then((success) => {

}).catch(() => {console.log("Sorry, it failed.");});





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
      .setTitle("Patrol Log Format")
      .setDescription("The following format **MUST** be followed in-order for your Patrol Log to be logged into the Trello.")
      .addField("  Division: \nUsername: \nPatrol Screenshot: \nDate: \nStart Time: \nEnd Time:", " • Keep in mind, division abbreviations **MUST** be used [SS, FPS, SRT, HSI]. \n • Links will **ONLY** be accepted for patrol screenshots. \n • The format only has to be in the order provided, capitalization will not affect the logging process.")
      .setColor("#ccccdd")
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")

      message.channel.send(raskj6);
      
    }

  

    if (message.channel.id === discordChannelID) {

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
    if(isCommand('Username:', message)){ 
    	
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

    if(isCommand('formatcom', message)){
      if(message.author.id !== ("236238325306884096")) return;


      message.delete().catch();

      let raskj654 = new discord.RichEmbed()
      .setTitle("Complaint Format")
      .setDescription("The following format **MUST** be followed in-order for your complaint not to be automatically deleted.")
      .addField("Username: \nRank: \nReason: \nEvidence: \nWitnesses: \nNotes:", "**Please Note:** All Complaints are reviewed thoroughly by the Homeland Security Investigations Department.")
      .setColor("#ccccdd")
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")

      message.channel.send(raskj654);
      
    }
    if (message.content.startsWith("Username:")) return;

    message.delete().catch();
    
  }

  var prefix = '.';
  var groupId = 3632026;
  var maximumRank = 70;

  function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
  }



  if(isCommand('Promote', message)){
		if(!message.member.roles.some(r=>["Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
				return;
    	var username = args[1]
    	if (username){
			
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){

						message.reply("Oops! Seems like I can't do that!")
					
					} else {

						roblox.promote(groupId, id)
						.then(function(roles){

							let embedfour = new discord.RichEmbed()
              .setTitle(`Success! ${username} has been promoted!`)
              .setDescription(`**Promotion Notice** \n${username} was promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}!`)
							.setColor("#3465ed")
              .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
							.setFooter(message.author.username, message.author.displayAvatarURL)
							.setTimestamp();

						
            message.channel.send(embedfour);
            console.log(`${username} was promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}!`)

						}).catch(function(err){
							message.channel.send("Failed to promote. Please try again.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't find them! Please try again!.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} isn't in the NYFA Group.`)
			});
    	} else {
    		message.channel.send("Oops! I think you forgot to give me the username.")
    	}
    	return;
	}
	
	if(isCommand('Demote', message)){
    if(!message.member.roles.some(r=>["Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further				return;
    	var username = args[1]
    	if (username){
			
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){

						message.reply("Oops! Seems like I can't do that!")
					
					} else {

						roblox.demote(groupId, id)
						.then(function(roles){

							let embedfour = new discord.RichEmbed()
							.setTitle(`Success! ${username} has been demoted!`)
              .setDescription(`**Demotion Notice** \n${username} was demoted from ${roles.oldRole.Name} to ${roles.newRole.Name}!`)
							.setColor("#3465ed")
              .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
							.setFooter(message.author.username, message.author.displayAvatarURL)
							.setTimestamp();

						
						message.channel.send(embedfour);

						}).catch(function(err){
							message.channel.send("Failed to promote. Please try again!")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't find them! Please try again!.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} isn't in the NYFA Group.`)
			});
    	} else {
    		message.channel.send("Oops! I think you forgot to give me the username.")
    	}
    	return;
	}
if(isCommand(`Shout`, message)){
	if(!message.member.roles.some(r=>["Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further		return;
	if (!args) { // Check if there's no arguments to use to shout, and return (stop going further)
	return;
	message.reply('Please specify a message to shout.')
}
const shoutMSG = args.slice(1).join(" "); // Joins the arguments minus prefix to form the message to be shouted

roblox.shout(groupId, shoutMSG)
	.then(function() {

		let embedsix = new discord.RichEmbed()
		.setTitle(`Success! Shout has been posted!`)
    .setDescription(`**Group Shout** \n${shoutMSG}`)
    .setColor("#3465ed")
    .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setTimestamp();

		message.channel.send(embedsix); // OPTIONAL - Logs specified string to the console
		// message.channel.send('Shouted to the group!') // OPTIONAL - Sends a message to the channel
	})
	.catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
		console.log(`Shout error: ${error}`) // Log the error to console if there is one.
	});
}















                        
 });

client.login(discordBotToken);
