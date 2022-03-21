import express from "express";
import compression from "compression";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import "dotenv/config";

import db from "./db";
import routes from "./routes";

const app = express();
const upload = multer()
// const router = Router();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("combined"));
app.use(cors());
// app.use(upload.array())
routes(app)

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
  db.authenticate()
    .then((d) => console.info(`Connected to Database`))
    .catch((e) => console.error(`Not connected to Database ${e}`));
});
