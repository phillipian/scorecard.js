var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schoolSchema = new Schema({
  name: { type: String, required: true },
  address: {
    line: { type: String, required: true },
    town: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

schoolSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('School', schoolSchema);
