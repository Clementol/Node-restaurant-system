import multer from "multer";
import shortid from "shortid";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import { config } from "../config";

let s3 = new aws.S3({
  region: "eu-west-2",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: config.BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "images/" + shortid.generate() + "-" + file.originalname);
    },
  }),
});

export default upload;
