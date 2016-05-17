var express = require('express'),
  parser = require('body-parser'),
  mongoose = require('mongoose');

var Game = require('./modules/game'),
  School = require('./modules/school'),
  Sport = require('./modules/sport'),
  Team = require('./modules/team');

var config = require('./config');

var app = express();
var http = require('http')
  .createServer(app);
var io = require('socket.io')(http);

mongoose.connect(process.env.MONGOLAB_URI || config.database);

app.set('port', process.env.PORT || 3000);

app.use(parser.urlencoded({
  extended: true
}));
app.use(parser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  next();
});

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Processing a request to', req.url + '.');
  next();
});

router.route('/schools/new')
  .post(function(req, res) {
    School.create(req, res);
  });

router.route('/sports/new')
  .post(function(req, res) {
    Sport.create(req, res);
  });

router.route('/teams/new')
  .post(function(req, res) {
    Team.create(req, res);
  });

router.route('/games/new')
  .post(function(req, res) {
    Game.create(req, res);
  });

router.route('/games')
  .get(function(req, res) {
    Game.list(req, res)
  });

router.route('/games/:id/score')
  .get(function(req, res) {
    Game.score(req, res);
  })
  .put(function(req, res) {
    Game.updateScore(req, res, io);
  });

router.route('/games/:id/status')
  .put(function(req, res) {
    Game.setStatus(req, res, io);
  })

app.use('/api/v1/', router);

app.use('*', function request(req, res) {
  res.json({
    error: 'Nothing to see here, move along!'
  });
});

io.on('connection', function(socket) {
  console.log('A user connected.');
});

http.listen(app.get('port'), function() {
  console.log('Phillipian Sports is up and running on port', app.get('port') + '.');
});
