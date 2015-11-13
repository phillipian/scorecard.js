var Sport = require('../models/sport');

module.exports = {
  create: function(req, res) {
    var request = req.body;

    var newSport = {
      name: request.name,
      season: request.season,
      level: request.level
    }

    Sport.create(newSport, function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        res.status(201).json({
          result: true,
          message: 'Sport was successfully created.'
        });
      }
    });
  }
}
