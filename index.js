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
//**Example:** \nDivision: FPS \nUsername: coolguzman11 \nPatrol Screenshot: https://www.tenor.co/xmGV.gif \nDate: 09/19/2018 \nStart Time: 9:00am EST \nEnd Time: 10:00am EST
      let raskj6 = new discord.RichEmbed()
      .setTitle("Patrol Log Format")
      .setDescription("The following format **MUST** be followed in-order for your Patrol Log to be logged into the Trello.")
      .addField("Username: \nPatrol Screenshot: \nDate: \nStart Time: \nEnd Time:", "**About NYDHS Discord Bot**\n • Links will **ONLY** be accepted for patrol screenshots. \n• If you do not receive a confirmation message, that means your log was **NOT** uploaded to the Trello and you need to try again and make sure you are using the correct format. \n • The format **ONLY** has to be in the order provided, capitalization will not affect the logging process. \n \n*Like the NYDHS Automated System? [ [Click here to learn more!]](https://www.patreon.com/coolguzman11)*")
      .setColor("#ccccdd")
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")

      message.channel.send(raskj6);
      
    }

  

    if (message.channel.id === discordChannelID) {

    //SS
		if(message.member.roles.some(r=>["Secret Service"].includes(r.name)) ) {// OPTIONAL - Checks if the sender has the specified roles to carry on further
      if(isCommand('Username:', message)){ 

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

//\n \n***Like the NYDHS Automated System? Have some spare bucks? Become a Patron!*** [Click here to learn more](https://www.patreon.com/coolguzman11)


      message.delete().catch();
      message.reply().then(msg => {msg.delete(15000)})
      message.channel.send(ssEmbed).then(msg => {msg.delete(15000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
  
    });
  }
}
    //SRT
		if(message.member.roles.some(r=>["Special Response Team"].includes(r.name)) ) {// OPTIONAL - Checks if the sender has the specified roles to carry on further
      if(isCommand('Username:', message)){ 

    const postTrello = require("./lib/trello/post_trello_SRT");
       
    postTrello(trelloClient, trelloIDList2, message).then((data) => {
      const dataObject = data;
      const shortUrl = dataObject.shortUrl;
      

      let srtEmbed = new discord.RichEmbed()
      .setColor("#3465ed")
      .setTitle("Patrol Log Successfully Uploaded!")
      .setDescription("Your log was uploaded to the **Special Response Team** Trello list.")
      .addField("Link to your log", `${shortUrl}`)
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();
  
      message.delete().catch();
      message.reply().then(msg => {msg.delete(15000)})
     message.channel.send(srtEmbed).then(msg => {msg.delete(15000)})
      
    }).catch((err) => {
      console.log(`FAILED!: ${err}`);
    });
    }
  }
      
    //FPS
		if(message.member.roles.some(r=>["Federal Protective Service"].includes(r.name)) ) {// OPTIONAL - Checks if the sender has the specified roles to carry on further
      if(isCommand('Username:', message)){ 

      
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
        message.reply().then(msg => {msg.delete(15000)})
        message.channel.send(fpsEmbed).then(msg => {msg.delete(15000)})
            
        }).catch((err) => {
          console.log(`FAILED!: ${err}`);
      });
      }
    }

      //HSI
      if(message.member.roles.some(r=>["Homeland Security Investigations"].includes(r.name)) ) {// OPTIONAL - Checks if the sender has the specified roles to carry on further
        if(isCommand('Username:', message)){ 

          
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
            message.reply().then(msg => {msg.delete(15000)})
           message.channel.send(hsiEmbed).then(msg => {msg.delete(15000)})
            
          }).catch((err) => {
            console.log(`FAILED!: ${err}`);
          });
        }
    }
  }
  if(message.author.bot) return;
  if (message.channel.id === discordInactive) {

    if(isCommand('inac', message)){
      if(message.author.id !== ("236238325306884096")) return;


      message.delete().catch();

      let raskj64 = new discord.RichEmbed()
      .setTitle("Inactivity Notice Format")
      .setDescription("The following format **MUST** be followed in-order for your Inactivity Notice to be logged into the Trello.")
      .addField("Username: \nRank: \nReason: \nDate of Leave: \nDate of Return: \nNote:", "**Please Note:** The format only has to be in the order provided, capitalization will not affect the logging process. \n \n*Like the NYDHS Automated System? [ [Click here to learn more!]](https://www.patreon.com/coolguzman11)*")
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
        message.reply().then(msg => {msg.delete(15000)})
       message.channel.send(hEmbed).then(msg => {msg.delete(15000)})
        
      }).catch((err) => {
        console.log(`FAILED!: ${err}`);
      });
    }
  }

  if(message.author.bot) return;
  if (message.channel.id === discordComplaints) {

    if(isCommand('com', message)){
      if(message.author.id !== ("236238325306884096")) return;


      message.delete().catch();

      let raskj654 = new discord.RichEmbed()
      .setTitle("Complaint Format")
      .setDescription("The following format **MUST** be followed in-order for your complaint not to be automatically deleted.")
      .addField("Username: \nRank: \nReason: \nEvidence: \nWitnesses: \nNotes:", "**Please Note:** All Complaints are reviewed thoroughly by the Homeland Security Investigations Department. \n \n*Like the NYDHS Automated System? [ [Click here to learn more!]](https://www.patreon.com/coolguzman11)*")
      .setColor("#ccccdd")
      .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")

      message.channel.send(raskj654);
      
    }
    if (message.content.startsWith("Username:")) return;

    message.delete().catch();
    
  }
  const roblox = require('noblox.js');
  const cookie = process.env.cookie;

  function login() {
    return roblox.cookieLogin(cookie);
    }
    
    login() // Log into ROBLOX
        .then(function() { // After the function has been executed
            console.log('Logged in.') // Log to the console that we've logged in
        })
        .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
            console.log(`Login error: ${error}`) // Log the error to console if there is one.
        });
        
  var prefix = '.';
  var groupId = 3632026;
  var maximumRank = 85;

  
function isCommand2(command, message){
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith(prefix + command);
}

 
	var args = message.content.split(/[ ]+/)

  if(isCommand2('Promote', message)){
		if(!message.member.roles.some(r=>["NYDHS Maintenance" ,"Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Lieutenant", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return;
        
        // if(message.author.id !== ("236238325306884096")) return;
    	var username = args[1]
    	if (username){
			
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){

            let embederror1 = new discord.RichEmbed()
            .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
            .setDescription("-> **Error**: It seems like the person you tried to promote has a too high of a rank! ")
            .setColor("#ef3939")
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();


						message.channel.send(embederror1);
					
					} else {

						roblox.promote(groupId, id)
						.then(function(roles){

							let embedfo2ur = new discord.RichEmbed()
              .setTitle(`Promotion Notice`) 
              .setDescription(`<@${message.author.id}> has **promoted** ${username} from ${roles.oldRole.Name} to ${roles.newRole.Name}!`)
							.setColor("#ccccdd")
              .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
						
						
            message.channel.send(embedfo2ur);

            let embedfourBA = new discord.RichEmbed()
            .setTitle(`Promotion Notice`)
            .setDescription(`<@${message.author.id}> has **promoted** ${username} from ${roles.oldRole.Name} to ${roles.newRole.Name}! \n- \nChannel Used: #${message.channel.name}`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter(`This is an automated messages in-responds to a successful promotion.`)
            .setTimestamp();

              client.guilds.get("490607262188961822").channels.get("504770196825702403").send(embedfourBA);

           
						}).catch(function(err){

      console.log(err)

              let embederror12 = new discord.RichEmbed()
              .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
              .setDescription("-> **Error**: It seems like I have ran into an internal error! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
              .setColor("#ef3939")
              .setFooter(message.author.username, message.author.displayAvatarURL)
              .setTimestamp();
  
  
              message.channel.send(embederror12);
            
						});
					}
				}).catch(function(err){

  console.log(err)

          let embederror122 = new discord.RichEmbed()
          .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
          .setDescription("-> **Error**: It seems like I can't find them in Roblox! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
          .setColor("#ef3939")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp();


          message.channel.send(embederror122);
        
				});
			}).catch(function(err){ 
console.log(err)

        let embederror12 = new discord.RichEmbed()
        .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
        .setDescription(`-> **Error**: It seems like ${username} isn't in the NYDHS Roblox group! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.`)
        .setColor("#ef3939")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp();


        message.channel.send(embederror12);
      
			});
    	} else {

        let embederror123 = new discord.RichEmbed()
        .setTitle("<:what:528422646598336523> This is awkward... you know I need a username right?")
        .setDescription("\n**Command Information:** \nDescription: Promotes a user by one rank. \nUsage: .promote [Roblox username] \nExample: .promote coolguzman11")
        .setColor("#ccccdd")
      


        message.channel.send(embederror123);
    	}
    	return;
	}
	if(isCommand2('Demote', message)){
		if(!message.member.roles.some(r=>["NYDHS Maintenance" ,"Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Lieutenant", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return;
        
        // if(message.author.id !== ("236238325306884096")) return;
    	var username = args[1]
    	if (username){
			
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){

            let embederror1 = new discord.RichEmbed()
            .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
            .setDescription("-> **Error**: It seems like the person you tried to demote has a too high of a rank! ")
            .setColor("#ef3939")
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();


						message.channel.send(embederror1);
					
					} else {

						roblox.demote(groupId, id)
						.then(function(roles){

							let embedfo2ur = new discord.RichEmbed()
              .setTitle(`Demote Notice`) 
              .setDescription(`<@${message.author.id}> has **demoted** ${username} from ${roles.oldRole.Name} to ${roles.newRole.Name}!`)
							.setColor("#ccccdd")
              .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
						
						
            message.channel.send(embedfo2ur);

            let embedfourBA = new discord.RichEmbed()
            .setTitle(`Demotion Notice`)
            .setDescription(`<@${message.author.id}> has **demoted** ${username} from ${roles.oldRole.Name} to ${roles.newRole.Name}! \n- \nChannel Used: #${message.channel.name}`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter(`This is an automated messages in-responds to a successful demotion.`)
            .setTimestamp();

              client.guilds.get("490607262188961822").channels.get("504770271757205504").send(embedfourBA);

           
						}).catch(function(err){

      console.log(err)

              let embederror12 = new discord.RichEmbed()
              .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
              .setDescription("-> **Error**: It seems like I have ran into an internal error! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
              .setColor("#ef3939")
              .setFooter(message.author.username, message.author.displayAvatarURL)
              .setTimestamp();
  
  
              message.channel.send(embederror12);
            
						});
					}
				}).catch(function(err){

  console.log(err)

          let embederror122 = new discord.RichEmbed()
          .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
          .setDescription("-> **Error**: It seems like I can't find them in Roblox! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
          .setColor("#ef3939")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp();


          message.channel.send(embederror122);
        
				});
			}).catch(function(err){ 
console.log(err)

        let embederror12 = new discord.RichEmbed()
        .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
        .setDescription(`-> **Error**: It seems like ${username} isn't in the NYDHS Roblox group! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.`)
        .setColor("#ef3939")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp();


        message.channel.send(embederror12);
      
			});
    	} else {

        let embederror123 = new discord.RichEmbed()
        .setTitle("<:what:528422646598336523> This is awkward... you know I need a username right?")
        .setDescription("\n**Command Information:** \nDescription: Demotes a user by one rank. \nUsage: .demote [Roblox username] \nExample: .demote coolguzman11")
        .setColor("#ccccdd")

      
    
        message.channel.send(embederror123);
    	}
    	return;
	}
	

if(isCommand2(`Shout`, message)){
  // if(message.author.id !== ("236238325306884096")) return;
  if(!message.member.roles.some(r=>["NYDHS Maintenance", "Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Lieutenant", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
  if (!args) { // Check if there's no arguments to use to shout, and return (stop going further)

  let embederror123 = new discord.RichEmbed()
      .setTitle("<:what:528422646598336523> This is awkward... you know I need a username right?")
      .setDescription("\n**Command Information:** \nDescription: Shouts to the Roblox group. \nUsage: .shout [message] \nExample: .shout hello!")
      .setColor("#ccccdd")
      
        message.channel.send(embederror123);
  return;
  
}
const shoutMSG = args.slice(1).join(" "); // Joins the arguments minus prefix to form the message to be shouted

roblox.shout(groupId, shoutMSG)
	.then(function() {

		let embedsix = new discord.RichEmbed()
		.setTitle(`Group Shout Notice`)
    .setDescription(`${shoutMSG} \nMessage by: <@${message.author.id}>`)
    .setColor("#ccccdd")
    .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")

		message.channel.send(embedsix); // OPTIONAL - Logs specified string to the console
    // message.channel.send('Shouted to the group!') // OPTIONAL - Sends a message to the channel


    let embedsix1 = new discord.RichEmbed()
		.setTitle(`Group Shout Notice`)
    .setDescription(`${shoutMSG} \nMessage by: <@${message.author.id}> \n- \nChannel Used: #${message.channel.name}`)
    .setColor("#ccccdd")
    .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
    .setFooter("All group shouts via the bot are being monitored and recorded on a Trello Board. Abuse of this system will result in a bot usage blacklist.")
    .setTimestamp();

    client.guilds.get("490607262188961822").channels.get("505011445440839680").send(embedsix1);
    
    
	})
	.catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
  client.users.get("236238325306884096").send(error);

  let embederror124 = new discord.RichEmbed()
  .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
  .setDescription(`-> **Error**: It seems like I have ran into an internal error! \n-> **Solution:** Contact the bot developer via Discord, Coolguzman11#8633.`)
  .setColor("#ef3939")
  .setFooter(message.author.username, message.author.displayAvatarURL)
  .setTimestamp();


  message.channel.send(embederror124);


  
  
  console.log(`Shout error: ${error}`) // Log the error to console if there is one.
	});
}

if(isCommand2('Suspend', message)){
  if(!message.member.roles.some(r=>["NYDHS Maintenance", "Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Lieutenant", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
      return;
      
      // if(message.author.id !== ("236238325306884096")) return;
    var username = args[1]
    if (username){
    
      roblox.getIdFromUsername(username)
    .then(function(id){
      roblox.getRankInGroup(groupId, id)
      .then(function(rank){
        if(maximumRank <= rank){

          let embederror10 = new discord.RichEmbed()
          .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
          .setDescription("-> **Error**: It seems like the person you tried to suspend has a too high of a rank! ")
          .setColor("#ef3939")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp();


          message.channel.send(embederror10);
        
        
        } else {
          let roleset= 10;

          roblox.setRank(groupId, id, roleset)
          .then(function(roles){

            let embedfou2r = new discord.RichEmbed()
            .setTitle(`Suspension Notice`)
            .setDescription(`<@${message.author.id}> has **suspended** ${username}!`)
            .setColor("#ccccdd")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            

          
          message.channel.send(embedfou2r);


          let embedfou23r = new discord.RichEmbed()
            .setTitle(`Suspension Notice`)
            .setDescription(`<@${message.author.id}> has **suspended** ${username}! \n- \nChannel Used: #${message.channel.name}`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter("All suspensions via the bot are being monitored and recorded on a Trello Board. Abuse of this system will result in a bot usage blacklist.")
            .setTimestamp();


            client.guilds.get("490607262188961822").channels.get("504770325377187851").send(embedfou23r);
      

         
         
					}).catch(function(err){

    console.log(err)

            let embederror12 = new discord.RichEmbed()
            .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
            .setDescription("-> **Error**: It seems like I have ran into an internal error! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If you still need further assistance, say **rankhelp**. If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
            .setColor("#ef3939")
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();


            message.channel.send(embederror12);
          
          });
        }
      }).catch(function(err){

console.log(err)

        let embederror122 = new discord.RichEmbed()
        .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
        .setDescription("-> **Error**: It seems like I can't find them in Roblox! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
        .setColor("#ef3939")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp();


        message.channel.send(embederror122);
      
      });
    }).catch(function(err){ 
      client.users.get("236238325306884096").send(err);

      let embederror12 = new discord.RichEmbed()
      .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
      .setDescription(`-> **Error**: It seems like ${username} isn't in the NYDHS Roblox group! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.`)
      .setColor("#ef3939")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();


      message.channel.send(embederror12);
    
    });
    } else {

      let embederror123 = new discord.RichEmbed()
      .setTitle("<:what:528422646598336523> This is awkward... you know I need a username right?")
      .setDescription("\n**Command Information:** \nDescription: Suspends a user within the NYDHS group. \nUsage: .suspend [Roblox username] \nExample: .suspend coolguzman11")
      .setColor("#ccccdd")


      message.channel.send(embederror123);
    }
    return;
}
  
if(isCommand2('Rank', message)){
  if(!message.member.roles.some(r=>["NYDHS Maintenance", "Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Lieutenant", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
      return;
      
      // if(message.author.id !== ("236238325306884096")) return;
    var username = args[1]
    var name = parseInt(args[2])
    if (username){
    
      roblox.getIdFromUsername(username)
    .then(function(id){
      roblox.getRankInGroup(groupId, id)
      .then(function(rank){
        if(maximumRank <= rank){

          let embederror10 = new discord.RichEmbed()
          .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
          .setDescription("-> **Error**: It seems like the person you tried to rank has a too high of a rank! ")
          .setColor("#ef3939")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp();


          message.channel.send(embederror10);
        
        
        } else {
          

          roblox.setRank(groupId, id, name)
          .then(function(newRole){
            const dataObject = newRole;
            const rankname12 = dataObject.Name;
      

            let embedfour7 = new discord.RichEmbed()
            .setTitle(`Ranking Notice`)
            .setDescription(`<@${message.author.id}> has **ranked** ${username} to ${rankname12}!`)
            .setColor("#ccccdd")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
    

          
          message.channel.send(embedfour7);

          let embedfour72 = new discord.RichEmbed()
            .setTitle(`Ranking Notice`)
            .setDescription(`<@${message.author.id}> has **ranked** ${username} to ${rankname12}! \n- \nChannel Used: #${message.channel.name}`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter("All promotions via the bot are being monitored and recorded on a Trello Board. Abuse of this system will result in a bot usage blacklist.")
            .setTimestamp();

            client.guilds.get("490607262188961822").channels.get("504770304992870421").send(embedfour72);
      
         

         
					}).catch(function(err){

    console.log(err)

            let embederror12 = new discord.RichEmbed()
            .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
            .setDescription("-> **Error**: It seems like I have ran into an internal error! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If you still need further assistance, say **rankhelp**. If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
            .setColor("#ef3939")
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();


            message.channel.send(embederror12);
          
          });
        }
      }).catch(function(err){

console.log(err)

        let embederror122 = new discord.RichEmbed()
        .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
        .setDescription("-> **Error**: It seems like I can't find them in Roblox! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
        .setColor("#ef3939")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp();


        message.channel.send(embederror122);
      
      });
    }).catch(function(err){ 
      client.users.get("236238325306884096").send(err);

      let embederror12 = new discord.RichEmbed()
      .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
      .setDescription(`-> **Error**: It seems like ${username} isn't in the NYDHS Roblox group! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.`)
      .setColor("#ef3939")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();


      message.channel.send(embederror12);
    
    });
    } else {

      let embederror123 = new discord.RichEmbed()
      .setTitle("<:what:528422646598336523> This is awkward... you know I need a username right?")
      .setDescription("\n**Command Information:** \nDescription: Ranks a user to a desired ranked. Say **rankhelp** for the rank codes. \nUsage: .rank [Roblox username] [rank number] \nExample: .rank coolguzman11 10")
      .setColor("#ccccdd")

      message.channel.send(embederror123);
    }
    return;
}

if(isCommand('rankhelp', message)){
  if(!message.member.roles.some(r=>["NYDHS Maintenance", "Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection", "Captain", "Lieutenant", "Sergeant"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
      return;

      
      
      let embedfour1 = new discord.RichEmbed()
            .setTitle(`Help Menu: Rank Command`)
            .setDescription("The following are the numerical codes for each rank.")
            .addField("Lieutenant - 85 \nSergeant - 80 \nCorporal - 75 \nSpecial Response Team Agent - 70 \nInvestigations Office - 60 \nSecret Service Agent - 50 \nFederal Protection Officer - 40 \nAgent in Training - 30 \nRepresentative - 20", "**About the Rank Command** \nIn order for you to properly use the rank command you are to find the numerical number form that matches the rank you are trying to rank the user. \n**For Example:** .rank coolguzman11 50")
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
          

            message.reply().then(msg => {msg.delete[9000]});
            message.channel.send(embedfour1).then(msg => {msg.delete[9000]});

          
     
}


if(isCommand2('exile', message)){
  if(!message.member.roles.some(r=>["NYDHS Maintenance", "Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
      return;
      
      // if(message.author.id !== ("236238325306884096")) return;
    var username = args[1]
    if (username){
    
      roblox.getIdFromUsername(username)
    .then(function(id){
      roblox.getRankInGroup(groupId, id)
      .then(function(rank){
        if(maximumRank <= rank){

          
          let embederror10 = new discord.RichEmbed()
          .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
          .setDescription("-> **Error**: It seems like the person you tried to terminate has a too high of a rank! ")
          .setColor("#ef3939")
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp();


          message.channel.send(embederror10);
                
        } else {
       

          roblox.exile(groupId, id)
          .then(function(roles){

            let embedfou22r = new discord.RichEmbed()
            .setTitle(`Termination Notice`)
            .setDescription(`<@${message.author.id}> has **terminated** ${username}!`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
        

          
          message.channel.send(embedfou22r);


          let embedfou223r = new discord.RichEmbed()
            .setTitle(`Termination Notice`)
            .setDescription(`<@${message.author.id}> has **terminated** ${username}! \n- \nChannel Used: #${message.channel.name}`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter("All commands ran via the bot are being monitored and recorded on a Trello Board. Abuse of this system will result in a bot usage blacklist.")
            .setTimestamp();


            client.guilds.get("490607262188961822").channels.get("504770451441188874").send(embedfou223r);
      

        
					}).catch(function(err){

    console.log(err)

            let embederror12 = new discord.RichEmbed()
            .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
            .setDescription("-> **Error**: It seems like I have ran into an internal error! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If you still need further assistance, say **rankhelp**. If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
            .setColor("#ef3939")
            .setFooter(message.author.username, message.author.displayAvatarURL)
            .setTimestamp();


            message.channel.send(embederror12);
          
          });
        }
      }).catch(function(err){

console.log(err)

        let embederror122 = new discord.RichEmbed()
        .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
        .setDescription("-> **Error**: It seems like I can't find them in Roblox! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
        .setColor("#ef3939")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp();


        message.channel.send(embederror122);
      
      });
    }).catch(function(err){ 
      client.users.get("236238325306884096").send(err);

      let embederror12 = new discord.RichEmbed()
      .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
      .setDescription(`-> **Error**: It seems like ${username} isn't in the NYDHS Roblox group! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.`)
      .setColor("#ef3939")
      .setFooter(message.author.username, message.author.displayAvatarURL)
      .setTimestamp();


      message.channel.send(embederror12);
    
    });
    } else {

      let embederror123 = new discord.RichEmbed()
      .setTitle("<:what:528422646598336523> This is awkward... you know I need a username right?")
      .setDescription("\n**Command Information:** \nDescription: Terminates a desired user. \nUsage: .exile [Roblox username] \nExample: .exile coolguzman11")
      .setColor("#ccccdd")

    
      message.channel.send(embederror123);
    }
    return;
}

if(isCommand2('accept', message)){
  if(!message.member.roles.some(r=>["NYDHS Maintenance", "Secretary", "Deputy Secretary", "Assistant Secretary", "Head of Operations", "Director of Intelligence", "SRT Commander", "Secret Service Director", "Chief of Federal Protection"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
      return;
      
      // if(message.author.id !== ("236238325306884096")) return;
    var username = args[1]
    if (username){

      roblox.getIdFromUsername(username)
      .then(function(id){
        roblox.handleJoinRequest(groupId, username, true)
        .then(function(promise){
          roblox.getRankInGroup(groupId, id)
          .then(function(rank){

            let embedfou22r = new discord.RichEmbed()
            .setTitle(`Acceptance Notice`)
            .setDescription(`<@${message.author.id}> has **accepted** ${username} into the New York Department of Homeland Security!`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
          
  
          
          message.channel.send(embedfou22r);
  
  
          let embedfou223r = new discord.RichEmbed()
          .setTitle(`Acceptance Notice`)
          .setDescription(`<@${message.author.id}> has **accepted** ${username} into the New York Department of Homeland Security! \n- \nChannel Used: #${message.channel.name}`)
          .setColor("#3465ed")
          .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
          .setFooter("All commands ran via the bot are being monitored and recorded on a Trello Board. Abuse of this system will result in a bot usage blacklist.")
          .setTimestamp();
  
  
          client.guilds.get("490607262188961822").channels.get("509520756338851842").send(embedfou223r);

          }).catch(function(err){
            console.log(err)
            message.reply("Contact my dad.")

          });

         
      }).catch(function(err){

console.log(err)

        let embederror122 = new discord.RichEmbed()
        .setTitle("<a:oops:528371628032262145> Whoops! Looks like I came upon an error!")
        .setDescription("-> **Error**: It seems like I couldn't accept them into NYDHS! \n-> **Solution:** Please make sure your spelling the Roblox name correctly, and try again (Yes, capitalization matters!). If this error continues contact the bot developer via Discord, Coolguzman11#8633.")
        .setColor("#ef3939")
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp();


        message.channel.send(embederror122);

      });
    
       
      

         
          }).catch(function(err){
            console.log(err)
            message.reply("Contact my dad.")
          });
        
    } else {

      let embederror123 = new discord.RichEmbed()
      .setTitle("<:what:528422646598336523> This is awkward... you know I need a username right?")
      .setDescription("\n**Command Information:** \nDescription: Accepts a desired user into NYDHS. \nUsage: .accept [Roblox username] \nExample: .accept coolguzman11")
      .setColor("#ccccdd")
    
      message.channel.send(embederror123);
    }
    return;
}


if(isCommand2('say', message)){
  if(!message.member.roles.some(r=>["NYDHS Maintenance"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
      return;

      message.delete().catch();

      if(!message.content.includes("yes")) {
      var botmessage = args.slice(1).join(" ")

      let embedfour1 = new discord.RichEmbed()
            .setDescription(`**Message From:** <@${message.author.id}> \n \n${botmessage} \n \n***Like the NYDHS Automated System? Have some spare bucks? \nBecome a Patron today! [ [Click here to learn more]](https://www.patreon.com/coolguzman11)***`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter("This Automated System is brought to you by Cool's Coding Service. For more information contact @Coolguzman11#8633.")
            .setTimestamp();

            message.channel.send(embedfour1)

      }else {
      var botmessage = args.slice(2).join(" ")

      let embedfour21 = new discord.RichEmbed()
            .setDescription(`**Message From:** <@${message.author.id}> \n \n${botmessage}`)
            .setColor("#3465ed")
            .setThumbnail("https://cdn.discordapp.com/attachments/462447883849957397/462653415990755339/download.png")
            .setFooter("This Automated System is brought to you by Cool's. Coding. Service. For more information contact @Coolguzman11#8633.")
            .setTimestamp();

            message.channel.send("@here")
            message.channel.send(embedfour21)

      };
    }


    if(isCommand2('logsfps', message)){
      if(!message.member.roles.some(r=>["NYDHS Maintenance"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
          return;
         
            const postTrello = require("./lib/trello/post_trello_ANOTHER");
       
            postTrello(trelloClient, trelloIDList3, message).then((data) => {
              
        message.reply(data)
            
              
            }).catch((err) => {
              console.log(`FAILED!: ${err}`);
            });
            

        }
    
    
    
    
    
    
    
    






                        
 });

client.login(discordBotToken);
