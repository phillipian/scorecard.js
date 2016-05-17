var mongoose = require('mongoose');

var Game = require('../models/game'),
  Sport = require('../models/sport');

module.exports = {
  create: function(req, res) {
    var request = req.body;

    var newGame = {
      opponent: mongoose.Types.ObjectId(request.opponent),
      sport: mongoose.Types.ObjectId(request.sport),
      team: mongoose.Types.ObjectId(request.team),
      date: new Date(request.date),
      scoring: [],
    }

    Game.create(newGame, function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        res.status(201).json({
          result: true,
          message: 'Game was successfully created.'
        });
      }
    });
  },
  list: function(req, res) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    Game.find({
        date: {
          $gte: date.setHours(0, 0, 0, 0),
          $lt: date.setDate(date.getDate() + 1)
        }
      })
      .populate('team').populate('sport').populate('opponent', 'name').exec(function(error, result) {
        if (error) {
          res.status(507).json({
            result: false,
            message: error.message
          });
        }

        if (result) {
          res.json({
            result
          })
        } else {
          res.json({
            result: false
          });
        }
      });
  },
  score: function(req, res, io) {
    Game.findById(req.params.id, function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        if (result.scoring.length == 0) {
          res.json({
            result: false,
            message: 'Game currently has no score.'
          })
        } else {
          var scores = result.scoring[result.scoring.length - 1];

          res.status(200).json({
            result: true,
            home: scores.home,
            away: scores.away
          });
        }
      }
    });
  },
  updateScore: function(req, res, io) {
    var request = req.body;

    var newScore = {
      home: request.home,
      away: request.away,
      notes: request.notes
    }

    Game.findByIdAndUpdate(req.params.id, {
      $push: {
        scoring: newScore
      }
    }).populate('sport team').exec(function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        io.sockets.emit('score-update', {
          sport: result.sport.name,
          gender: result.team.gender,
          score: newScore
        });

        res.status(200).json({
          result: true,
          message: 'Game\'s score was successfully updated'
        });
      } else {
        res.json({
          result: false,
          message: 'Unable to update score.'
        });
      }
    });
  },
  setStatus: function(req, res, io) {
    var request = req.body;

    var result = request.status;

    Game.findByIdAndUpdate(req.params.id, {
      status: result
    }, function(error, result) {
      if (error) {
        res.status(507).json({
          result: false,
          message: error.message
        });
      }

      if (result) {
        io.sockets.emit('status-update');

        res.status(200).json({
          result: true,
          message: 'Game\s status was successfully updated'
        });
      } else {
        res.json({
          result: false,
          message: 'Unable to update status.'
        });
      }
    });
  }
}
