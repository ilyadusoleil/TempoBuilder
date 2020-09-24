const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  url: {
    type: String
  },
  id: {
    type: String
  }
})


module.exports = mongoose.model('Image', ImageSchema)