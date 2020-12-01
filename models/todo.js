const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    require: true // 這個是必填欄位
  },
  isDone: {
    type: Boolean,
    default: false,
  }
})
module.exports = mongoose.model('Todo', todoSchema)
