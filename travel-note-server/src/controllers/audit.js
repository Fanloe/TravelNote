const dbConfig = require("../config/db");
const upload = require("../middleware/mypicture");

const url = dbConfig.url;
console.log("userdb.js");
//mongodb.js
const { MongoClient, ObjectId } = require("mongodb");
// Connection URL
const client = new MongoClient(url);

const GridFSBucket = require("mongodb").GridFSBucket;

// Database Name
const dbName = dbConfig.mydb;
const userCollectionName = dbConfig.user;
const noteCollectionName = dbConfig.note;
const auditCollectionName = dbConfig.audit;

module.exports = {};
