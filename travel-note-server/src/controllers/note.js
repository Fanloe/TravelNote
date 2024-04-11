const dbConfig = require("../config/db");
const upload = require("../middleware/mypicture");

const url = dbConfig.url;
console.log("note.js");
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

const searchText = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    await client.connect();
    const db = client.db(dbName);
    const noteTable = db.collection(noteCollectionName);

    const indexes = noteTable.indexInformation();
    if ("user_text_title_text_content_text" in indexes)
      await noteTable.createIndex({
        user: "text",
        title: "text",
        content: "text",
      });

    const result = await noteTable
      .find({ $text: { $search: searchQuery } })
      .toArray();
    client.close();

    console.log(result);
    return res.status(200).json({
      message: "Notes found",
      result,
    });
  } catch (error) {
    return res.send({
      message: "Error searching notes",
      error: error.message,
    });
  }
};

const addNote = async (req, res) => {
  try {
    console.log(req.query);
    //pictures
    await upload(req, res);
    let picturesId = [];
    req.files.forEach((picture) => {
      //   console.log(picture.id.toString());
      picturesId.push(picture.id.toString());
    });
    var updatedDate = new Date();
    await client.connect();
    const db = client.db(dbName);
    const userTable = db.collection(userCollectionName);
    const noteTable = db.collection(noteCollectionName);

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

    var noteIds = [];

    if (!("notes" in user)) {
      noteIds = [noteId];
    } else {
      noteIds = user["notes"];
      console.log(noteIds);
      noteIds.push(noteId);
    }
    console.log(noteIds);
    const updateUser = await userTable.updateOne(
      { _id: user._id },
      { $set: { notes: noteIds } }
    );

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

const getNoteById = async (req, res) => {
  try {
    const noteId = req.query.note;

    await client.connect();
    const db = client.db(dbName);
    const noteTable = db.collection(noteCollectionName);
    const auditTable = db.collection(auditCollectionName);

    note = await noteTable.findOne({ _id: new ObjectId(noteId) });
    const audit = await auditTable.findOne({ note: noteId });
    console.log(audit);
    if (audit && "opinion" in audit) {
      note["opinion"] = audit.opinion;
    } else {
      note["opinion"] = "No opinion";
    }
    console.log(note);
    client.close();
    return res.status(200).json({
      message: "Get user notes successfully",
      note,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const getNoteByUsername = async (req, res) => {
  try {
    const username = req.query.username;

    await client.connect();
    const db = client.db(dbName);
    const noteTable = db.collection(noteCollectionName);
    let array = [];
    array = await noteTable.find({ user: username }).toArray();

    const auditTable = db.collection(auditCollectionName);
    for (note of array) {
      // console.log(note);
      const audit = await auditTable.findOne({ note: note._id.toString() });
      console.log(audit);
      if (audit && "opinion" in audit) {
        note["opinion"] = audit.opinion;
      } else {
        note["opinion"] = "No opinion";
      }
      console.log(note);
    }
    client.close();
    return res.status(200).json({
      message: "Get user notes successfully",
      array,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const noteTable = db.collection(noteCollectionName);
    let array = [];
    array = await noteTable.find({}).toArray();

    client.close();
    return res.status(200).json({
      message: "Get user notes successfully",
      array,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const getNotesByStatus = async (req, res) => {
  try {
    // const username = req.query.username;
    // console.log(username);
    // const statusOfNotes = 1;
    const statusOfNotes = req.query.status;
    // console.log(statusOfNotes);
    await client.connect();
    const db = client.db(dbName);
    // const collection = db.collection(userCollectionName);
    // const user = await collection.findOne({ username });
    // console.log(user);
    // const userId = user._id.toString();
    // // const noteIds = user.notes;
    // console.log(userId);
    // client.close();

    const noteTable = db.collection(noteCollectionName);
    const userTable = db.collection(userCollectionName);

    let array = [];
    array = await noteTable.find({ status: Number(statusOfNotes) }).toArray();
    // .forEach(async (note) => {
    //   // console.log(note);
    //   console.log(note.user);
    //   const user = await userTable.findOne({ _id: note.user });
    //   console.log(user);
    //   note.user = user.username;
    // });
    // console.log(array);
    // await mongoClient.connect();
    client.close();

    return res.status(200).json({
      message: "Get user notes successfully",
      array,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const changeNoteStatus = async (req, res) => {
  try {
    // const username = req.query.username;
    // console.log(username);
    // const statusOfNotes = 1;
    const changeToStatus = req.query.status;
    const noteId = req.query.note;

    await client.connect();
    const db = client.db(dbName);
    // const collection = db.collection(userCollectionName);
    // const user = await collection.findOne({ username });
    // console.log(user);
    // const userId = user._id.toString();
    // // const noteIds = user.notes;
    // console.log(userId);
    // client.close();

    const noteTable = db.collection(noteCollectionName);
    const note = await noteTable.findOne({ _id: noteId });
    console.log(note);
    note.status = Number(changeToStatus);

    await noteTable.updateOne(
      { _id: noteId },
      { $set: { status: changeToStatus } }
    );
    // await mongoClient.connect();
    client.close();

    return res.status(200).json({
      message: "Get user notes successfully",
      note,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    console.log(req.query);
    const username = req.query.username;
    const noteId = req.query.note;

    await client.connect();
    const db = client.db(dbName);
    const userTable = db.collection(userCollectionName);
    const noteTable = db.collection(noteCollectionName);

    const user = await userTable.findOne({ username: username });
    const note = await noteTable.deleteOne({ _id: new ObjectId(noteId) });

    const noteIds = user["notes"];
    // console.log(noteIds);

    var newNoteIds = [];
    for (id of noteIds) {
      if (id !== noteId) {
        console.log(id);
        console.log(noteId);
        newNoteIds.push(id);
      }
    }
    // console.log(noteIds.toString());
    console.log(newNoteIds.toString());
    await userTable.updateOne(
      {
        username: username,
      },
      {
        $set: {
          notes: newNoteIds,
        },
      }
    );

    const newUser = await userTable.findOne({ username: username });
    console.log(newUser.toString());

    client.close();

    return res.send({
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.send({
      message: "Error deleting note",
      error: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    console.log(req.query);
    // pictures;
    await upload(req, res);
    let picturesId = [];
    req.files.forEach((picture) => {
      //   console.log(picture.id.toString());
      picturesId.push(picture.id.toString());
    });
    var updatedDate = new Date();
    await client.connect();
    const db = client.db(dbName);
    // const userTable = db.collection(userCollectionName);
    const noteTable = db.collection(noteCollectionName);

    const noteId = req.query.note;
    // const user = await userTable.findOne({ username: req.query.username });
    // const userId = user._id.toString();
    const username = req.query.username;
    const title = req.query.title;
    const content = req.query.content;
    const originNote = await noteTable.updateOne(
      { _id: new ObjectId(noteId) },
      {
        $set: {
          // user: username,
          title: title,
          content: content,
          date: updatedDate,
          pictures: picturesId,
          status: 0,
        },
      }
    );
    client.close();

    return res.send({
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.send({
      message: "Error updating note",
      error: error.message,
    });
  }
};

const uploadFiles = async (req, res) => {
  try {
    console.log(req);
    await upload(req, res);
    // console.log(req.files);
    req.files.forEach((picture) => {
      //   console.log(ObjectId.valueof(file.id));
      console.log(picture.id.toString());
    });

    console.log(req.query);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "Files have been uploaded.",
    });

    // console.log(req.file);

    // if (req.file == undefined) {
    //   return res.send({
    //     message: "You must select a file.",
    //   });
    // }

    // return res.send({
    //   message: "File has been uploaded.",
    // });
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });

    // return res.send({
    //   message: "Error when trying upload image: ${error}",
    // });
  }
};

module.exports = {
  addNote,
  uploadFiles,
  getNotesByStatus,
  changeNoteStatus,
  updateNote,
  getAllNotes,
  getNoteByUsername,
  searchText,
  deleteNote,
  getNoteById,
  //   getListFiles,
  //   download,
};
