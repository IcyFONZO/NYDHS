module.exports = (trelloClient, trelloIDList2, message) => {
  const userName = message.member.nickname;
  const content = message.content;
  const title = `${userName}`;
  const desc = `${content}`;
  console.log(`Send Trello: ${title}`);
  return new Promise((resolve, reject) => {
    trelloClient.post("/1/cards", {idList: trelloIDList2, name: title, desc: desc}, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
};
