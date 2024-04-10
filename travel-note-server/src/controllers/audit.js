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

const addAudit = async (req, res) => {
  try {
    console.log(req.query);
    //pictures
    // await upload(req, res);
    // let picturesId = [];
    // req.files.forEach((picture) => {
    //   //   console.log(picture.id.toString());
    //   picturesId.push(picture.id.toString());
    // });
    const noteId = req.query.note;
    const username = req.query.user;

    const afterStatus = Number(req.query.status);
    const opinion = req.query.opinion;
    var auditDate = new Date();

    await client.connect();
    const db = client.db(dbName);
    // const userTable = db.collection(userCollectionName);
    const noteTable = db.collection(noteCollectionName);
    const auditTable = db.collection(auditCollectionName);

    // const user = await userTable.findOne({ username: username });

    const note = await noteTable.findOne({ _id: ObjectId(noteId) });
    const beforeStatus = note.status;
    note["status"] = afterStatus;
    console.log(note);
    const updateNote = await noteTable.updateOne(
      { _id: ObjectId(noteId) },
      { $set: note }
    );
    // const user = await userTable.findOne({ username: req.query.username });
    // const userId = user._id.toString();

    const audit = {
      auditor: username,
      note: noteId,
      date: auditDate,
      opinion: opinion,
      beforeStatu: beforeStatus,
      afterStatus: afterStatus,
    };
    console.log(audit);

    const result = await auditTable.insertOne(audit);
    console.log(result);
    // const noteId = result.insertedId.toString();
    client.close();

    return res.send({
      message: "Audit added successfully",
    });
  } catch (error) {
    return res.send({
      message: "Error adding audit",
      error: error.message,
    });
  }
};

const getAuditByUser = async (req, res) => {
  try {
    const username = req.query.user;
    await client.connect();
    const db = client.db(dbName);
    const noteTable = db.collection(noteCollectionName);
    const auditTable = db.collection(auditCollectionName);

    const audits = await auditTable.find({ auditor: username }).toArray();
    console.log(audits);
    client.close();

    return res.send({
      message: "Audit fetched successfully",
      audits: audits,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = { addAudit, getAuditByUser };
