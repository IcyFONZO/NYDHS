module.exports = (trelloClient, trelloIDList6, message) => {
    const userName = message.member.nickname;
    //${message.member.nickname has **promoted** ${username} from ${roles.oldRole.Name} to ${roles.newRole.Name}!
    const title = `${userName}`;
    const desc = `${message.member.nickname} has **promoted** ${username} from ${roles.oldRole.Name} to ${roles.newRole.Name}!`;
    console.log(`Send Trello: ${title}`);
    return new Promise((resolve, reject) => {
      trelloClient.post("/1/cards", {idList: trelloIDList6, name: title, desc: desc}, (err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  };
  
