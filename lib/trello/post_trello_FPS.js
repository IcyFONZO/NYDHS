module.exports = (trelloClient, trelloIDList3, message) => {
  try{
    const userName = message.member.nickname;
  }catch( error ){const userName = message.member.username}
  const content = message.content;
  const title = `${userName}`;
  const desc = `${content}`;
  console.log(`Send Trello: ${title}`);
  return new Promise((resolve, reject) => {
    trelloClient.post("/1/cards", {idList: trelloIDList3, name: title, desc: desc}, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
};
