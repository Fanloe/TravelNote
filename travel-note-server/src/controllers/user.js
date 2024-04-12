const dbConfig = require("../config/db");
const upload = require("../middleware/figure");

const url = dbConfig.url;
console.log("userdb.js");
//mongodb.js
const { MongoClient, ObjectId } = require("mongodb");
// Connection URL
const client = new MongoClient(url);

const GridFSBucket = require("mongodb").GridFSBucket;

// Database Name
const dbName = dbConfig.mydb;
const collectionName = dbConfig.user;
const noteCollectionName = dbConfig.note;

/**
 * 查询用户名返回用户
 */
// const queryUser = async (name) => {
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection(collectionName);
//   const origin = await collection.findOne({ name });
//   client.close();
//   return origin;
// };
/**
 *添加数据到数据库
 */
const register = async (req, res) => {
  const { query } = req;
  // console.log(req);
  const username = query.username;
  const password = query.password;
  // console.log(req.query);
  // if(authority in query){

  // }
  const authority = query.authority;
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const origin = await collection.findOne({ username });
  console.log(origin);
  // Use connect method to connect to the server
  // console.log("test");
  if (origin) {
    client.close();
    res.status(412).json({
      message: "User already exists",
      error: "User already exists",
    });
  } else {
    await collection.insertOne({ username, password, authority });
    client.close();
    res.status(200).json({
      message: "Sign-up success",
      user: {
        name: username,
        password: password,
        authority: authority,
        figure: "66131f250bca6d9495481d70",
      },
    });
  }
};
/**
 * 上传用户figure
 * @param {password} req
 * @param {mes} res
 * @returns
 */
const uploadUserFigure = async (req, res) => {
  try {
    const username = req.query.username;
    const query = req.query;
    console.log(query);
    console.log(username);

    await upload(req, res);
    const figureId = req.files[0].id.toString();
    console.log(figureId.toString());
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const user = await collection.findOne({ username });
    await collection.updateOne(
      { _id: user._id },
      { $set: { figure: figureId } }
    );
    console.log(user);
    client.close();

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

/**
 * get user figure
 */

const getUserFigure = async (req, res) => {
  try {
    const username = req.query.username;
    console.log(username);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const user = await collection.findOne({ username });
    console.log(user);
    const figureId = user.figure;
    // client.close();

    // await mongoClient.connect();

    const database = client.db(dbConfig.mydb);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.figBucket,
    });
    console.log("figureId: " + figureId);

    // let downloadStream = bucket.openDownloadStreamByName(req.query.username);
    let downloadStream = bucket.openDownloadStream(new ObjectId(figureId));

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
/**
 * 通过picture id返回图片
 */
const getPictureById = async (req, res) => {
  try {
    const pictureId = req.query.picture;
    console.log(pictureId);

    await client.connect();
    const database = client.db(dbConfig.mydb);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.picBucket,
    });
    console.log("pictureId: " + pictureId);

    // let downloadStream = bucket.openDownloadStreamByName(req.query.username);
    let downloadStream = bucket.openDownloadStream(new ObjectId(pictureId));

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
/**
 * 得到用户的所有帖子
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUserAllNotes = async (req, res) => {
  try {
    const username = req.query.username;
    console.log(username);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const user = await collection.findOne({ username });
    console.log(user);
    const userId = user._id.toString();
    // const noteIds = user.notes;
    console.log(userId);
    // client.close();

    const noteTable = db.collection(noteCollectionName);
    const array = await noteTable.find({ user: username }).toArray();
    console.log(array);
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

/**
 * 清空数据库
 */
const deleteMany = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  await collection.deleteMany();
  client.close();
  return "done.";
};

/**
 * 获取数据集
 * @returns array
 */
const getAllUser = async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const array = await collection.find().toArray();
  client.close();
  return res.json(array);
};

/**
 *  验证用户名的密码是否正确
 */
const verifyNormalUser = async (req, res) => {
  const { query } = req;
  const username = query.username;
  const password = query.password;
  console.log(username);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const user = await collection.findOne({ username });
  console.log(user);
  console.log(username);
  console.log(password);
  client.close();
  if (user && user.password == password && user.authority == 0) {
    return res.status(200).json({
      message: "success",
      data: user,
    });
  } else {
    return res.status(401).json({
      message: "fail",
      data: null,
    });
  }
};

const verifyAdministrator = async (req, res) => {
  const { query } = req;
  const username = query.username;
  const password = query.password;

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const user = await collection.findOne({ username });
  console.log(user);
  client.close();
  if (
    user &&
    user.password == password &&
    (user.authority == 1 || user.authority == 2)
  ) {
    return res.status(200).json({
      message: "success",
      data: user,
    });
  } else {
    return res.status(401).json({
      message: "fail",
      data: null,
    });
  }
};

//把方法暴露出去
module.exports = {
  register,
  getAllUser,
  // deleteMany,
  verifyNormalUser,
  verifyAdministrator,
  uploadUserFigure,
  getUserFigure,
  getUserAllNotes,
  getPictureById,
};
