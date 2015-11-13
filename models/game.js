var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var gameSchema = new Schema({
  opponent: { type: Schema.Types.ObjectId, required: true, ref: 'School' },
  sport: { type: Schema.Types.ObjectId, required: true, ref: 'Sport' },
  team: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
  date: { type: Date, required: true },
  scoring: [{
    home: { type: Number, required: true, default: 0 },
    away: { type: Number, required: true, default: 0 },
    notes: { type: String, required: false},
    updated_at: { type: Date, default: Date.now }
  }],
  status: { type: Number, default: -1 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

gameSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Game', gameSchema);
