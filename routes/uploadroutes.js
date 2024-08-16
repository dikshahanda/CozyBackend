const express = require('express');
// const app = express();
const multer = require('multer');
const uploadroute = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
const {isAdmin} = require('../middleware/checkRole');
const { uploads } = require('../controller/uploads');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, (file.fieldname + '-' + uniqueSuffix) + '.png')
    }
  })


const upload = multer({ storage: storage })


uploadroute.post('/',verifyToken,isAdmin, upload.single('file'),uploads);

module.exports = {uploadroute}