const multer = require("multer");
const shortid = require("shortid");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const config = require("../config");

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

module.exports = upload;
