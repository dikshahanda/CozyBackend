// const User = require('../models/User');
// const bcrypt = require('bcrypt');
require('dotenv').config();
const multer = require('multer');
const winston = require('winston');



const uploads = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const BASE_URL = process.env.BASE_URL;
    const URL = `${BASE_URL}/uploads/${req.file.filename}`;
    return res.status(200).json({ uploadedURL: URL});
  }
  catch (error) {
    console.log(error.message);
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};



module.exports = { uploads };