module.exports = (trelloClient, trelloIDList3, message) => {
  return new Promise((resolve, reject) => {

    trelloClient.get("/1/lists/560bf44ea68b16bd0fc2a9a9/cards?fields=name", (err, data) => {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
