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

const addAudit = async (req, res) => {
  try {
    console.log(req.query);
    //pictures
    await upload(req, res);
    let picturesId = [];
    // req.files.forEach((picture) => {
    //   //   console.log(picture.id.toString());
    //   picturesId.push(picture.id.toString());
    // });
    var updatedDate = new Date();
    await client.connect();
    const db = client.db(dbName);
    const userTable = db.collection(userCollectionName);
    const noteTable = db.collection(noteCollectionName);
    const auditTable = db.collection(auditCollectionName);

    const user = await userTable.findOne({ username: req.query.username });
    const userId = user._id.toString();
    const username = req.query.username;
    const title = req.query.title;
    const content = req.query.content;

    const note = {
      user: username,
      title: title,
      content: content,
      date: updatedDate,
      pictures: picturesId,
      status: 0,
    };

    const result = await noteTable.insertOne(note);
    console.log(result);
    const noteId = result.insertedId.toString();
    console.log(noteId);
    if (!("notes" in user)) {
      user["notes"] = [noteId];
    } else {
      user["notes"].push(noteId);
    }
    const updateUser = await userTable.updateOne(
      { _id: userId },
      { $set: { notes: user["notes"] } }
    );
    // console.log(note);
    client.close();

    return res.send({
      message: "Note added successfully",
    });
  } catch (error) {
    return res.send({
      message: "Error adding note",
      error: error.message,
    });
  }
};
