const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

let _client;

const mongoConnect = async () => {
  const dbs = await MongoClient.connect(
    "<connection string>"
  );
  _client = dbs.db("nodejs-shop");
  _client.createCollection("products");
  console.log("Connected db");
  return _client;
};

const getDB = () => {
  if (_client) {
    return _client;
  } else throw "No DB found";
};

module.exports.mongoConnect = mongoConnect;
module.exports.getDB = getDB;
