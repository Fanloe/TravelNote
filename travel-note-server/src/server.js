const cors = require("cors");
const express = require("express");
const app = express();
const initRoutes = require("./routes");

// var corsOptions = {
//   origin: "http://localhost:8080",
// };
// const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
