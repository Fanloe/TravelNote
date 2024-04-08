const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const noteController = require("../controllers/note");
const userController = require("../controllers/user");

let routes = (app) => {
  router.get("/", homeController.getHome);

  router.post("/upload", uploadController.uploadFiles);
  router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);

  router.get("/getalluser", userController.getAllUser);
  router.get("/register", userController.insertOne);
  router.get("/verifyNormalUser", userController.verifyNormalUser);
  router.post("/uploadUserFigure", userController.uploadUserFigure);
  router.get("/getUserFigure", userController.getUserFigure);

  router.get("/verifyAdministrator", userController.verifyAdministrator);

  router.post("/addNote", noteController.addNote);
  router.get("/getUserAllNotes", userController.getUserAllNotes);
  router.get("/getPicture", userController.getPictureById);
  router.post("/mypicture", noteController.uploadFiles);

  router.get("/getNotesByStatus", noteController.getNotesByStatus);
  router.get("/changeNoteStatus", noteController.changeNoteStatus);
  return app.use("/", router);
};

module.exports = routes;
