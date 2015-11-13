var mongoose = require('mongoose');

var School = require('../models/school');

module.exports = {
  create: function(req, res) {
    var request = req.body;

    var newSchool = {
      name: request.name,
      address: request.address
    }

    School.create(newSchool, function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        res.status(201).json({
          result: true,
          message: 'School was successfully created.'
        });
      }
    });
  }
}
