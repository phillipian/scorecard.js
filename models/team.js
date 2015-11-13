var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teamSchema = new Schema({
  roster: [{
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
    grad_year: { type: Number, required: true }
  }],
  gender: { type: String, required: true, uppercase: true, enum: [
    'M', 'F', 'COED'
  ]},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

teamSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Team', teamSchema);
