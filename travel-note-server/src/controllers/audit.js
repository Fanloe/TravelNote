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

    const note = await noteTable.findOne({ _id: new ObjectId(noteId) });
    const beforeStatus = note.status;
    // note["status"] = afterStatus;
    // note.push("opinion"  opinion;
    console.log(note);
    const updateNote = await noteTable.updateOne(
      { _id: new ObjectId(noteId) },
      { $set: { status: afterStatus, opinion: opinion } }
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
const getAllAudit = async (req, res) => {
  try {
    // const username = req.query.user;
    await client.connect();
    const db = client.db(dbName);
    const noteTable = db.collection(noteCollectionName);
    const auditTable = db.collection(auditCollectionName);

    const audits = await auditTable.find({}).toArray();

    for (audit of audits) {
      console.log(audit.toString());
      const note = await noteTable.findOne({ _id: new ObjectId(audit.note) });
      console.log(note);
      if (note && "title" in note) {
        audit["title"] = note.title;
      } else {
        audit["title"] = "No title";
      }
      console.log(audit.toString());
    }

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
const getAuditByUser = async (req, res) => {
  try {
    const username = req.query.user;
    await client.connect();
    const db = client.db(dbName);
    const noteTable = db.collection(noteCollectionName);
    const auditTable = db.collection(auditCollectionName);

    const audits = await auditTable.find({ auditor: username }).toArray();

    for (audit of audits) {
      console.log(audit.toString());
      const note = await noteTable.findOne({ _id: new ObjectId(audit.note) });
      console.log(note);
      if (note && "title" in note) {
        audit["title"] = note.title;
      } else {
        audit["title"] = "No title";
      }
      console.log(audit.toString());
    }

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
module.exports = { addAudit, getAuditByUser, getAllAudit };
