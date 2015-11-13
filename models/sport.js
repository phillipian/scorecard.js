var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sportSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: Schema.Types.ObjectId, required: true, ref: 'Sport' },
  season: { type: String, required: true, uppercase: true, enum: [
      'FALL', 'WINTER', 'SPRING'
  ]},
  level: { type: String, required: true, uppercase: true, enum: [
      'VARSITY', 'JUNIOR VARSITY'
  ]},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

sportSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Sport', sportSchema);
