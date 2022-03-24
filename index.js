const express = require("express");
const compression = require("compression");
const cors = require("cors");
const multer = require("multer");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("combined"));
app.use(cors());

require("./routes")(app)

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
  db.authenticate()
    .then((d) => console.info(`Connected to Database`))
    .catch((e) => console.error(`Not connected to Database ${e}`));
});
