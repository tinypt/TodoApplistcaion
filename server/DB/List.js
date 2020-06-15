const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  isDone: {
    type: Boolean,
  },
});

var List = (module.exports = mongoose.model('list', listSchema));
module.exports.get = function(callback, limit) {
  List.find(callback).limit(limit);
};
