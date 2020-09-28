const express = require('express');
const router = express.Router();

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const Image = require('../models/Image');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tempoBuilder',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },

  // TODO get below properties working
  // allowedFormats: ['png'],
  // transformation: [{ width: 2500, height: 1000, crop: 'limit' }],

});

const parser = multer({ storage: storage });

router.post('/images', parser.single('image'), (req, res) => {
  console.log(req.file); // to see what is returned to you
  const image = {};
  image.url = req.file.path;
  image.id = req.file.originalname;
  Image.create(image) // save image information in database
    .then((newImage) => res.json(newImage))
    .catch((err) => console.log(err));
});

module.exports = router;
