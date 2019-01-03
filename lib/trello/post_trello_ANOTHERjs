module.exports = (trelloClient, trelloIDList3, message) => {
  return new Promise((resolve, reject) => {

    trelloClient.get("/1/lists/5b3666d10d8fe077f2f81499/cards?fields=name", (err, data) => {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
