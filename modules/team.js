var mongoose = require('mongoose');

var Team = require('../models/team');

module.exports = {
  create: function(req, res) {
    var request = req.body;

    var newTeam = {
      roster: [],
      gender: request.gender
    }

    Team.create(newTeam, function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        res.status(201).json({
          result: true,
          message: 'Team was successfully created.'
        });
      }
    });
  },
  find: function(req, res) {
    Team.findById(req.params.id, function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        res.json({
          result
        });
      }
      else {
        res.json({
          result: false,
          message: 'No teams were found.'
        });
      }
    });
  }
}
