const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: String,
  isDone: {
    type: Boolean,
    default: false
  }
});
const todoModel = mongoose.model("todo", TodoSchema);
module.exports = todoModel