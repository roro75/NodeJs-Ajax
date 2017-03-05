/**
 * Send Ajax information with NodeJs / ExpressJs
 * [nodejs server] Ajax
 * https://github.com/roro75/
 * version 1 - 20170305 *
 */

var express = require('express');
var path = require('path');
var colors = require('colors');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var parseurl = require('parseurl');
var stringify = require('js-stringify');

var db = require('./db');

app.locals.pretty = true;

// public

app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');

app.get('/', function (req,res) {

        res.render('index', { titre:'Depart'});
});

app.get('/depart', function(req, res){
    var requete = "requete GET";

    var collection = db.get().collection('tgv');
    collection.distinct('fields.depart', function(err, docs){
        docs.sort();
        res.render('depart', { titre:'Depart', depart:docs});

    });
});

app.get('/destination', function(req, res, next){
  var collection = db.get().collection('tgv');
  collection.find().toArray(function(err, data){

        collection.distinct('fields.arrivee', {'fields.depart' : req.query.depart}, function(err, data){
            data.sort();
           res.json({elements:data});
                  // console.log(colors.gray.bold(req.query.depart));
                  // console.log(colors.cyan.bold(data));
        });
  });
});

app.get('/dates', function(req, res, next){
  var collection = db.get().collection('tgv');
  collection.find().toArray(function(err, data){

        collection.distinct('fields.date',{'fields.depart' : req.query.depart, 'fields.arrivee' : req.query.destination}, function(err,data) {
            data.sort();
            res.json({ elements: data});
                  // console.log(colors.gray.bold('depart',req.query.depart));
                  // console.log(colors.yellow.bold('destination',req.query.destination));
                  // console.log(colors.cyan.bold('data', data));
      });
  });
});

app.get('/affichage', function(req, res, next){
  var collection = db.get().collection('tgv');
      collection.find({'fields.depart' : req.query.depart, 'fields.arrivee' : req.query.destination, "fields.date" : req.query.dates}).toArray(function(err,data) {

        res.json({ elements: data});
                  // console.log(colors.gray.bold('depart',req.query.depart));
                  // console.log(colors.yellow.bold('destination',req.query.destination));
                  // console.log(colors.cyan.bold('data', data));
      });
});

// 404 response
app.use(function(req, res, next) {
  res.status(404).render('404', {
    //documentTitle: 'Document non trouvé (Erreur 404)'
  });
});

// Setup MongoDB connection
var dbConfig = {
  dbName: 'sncf',
  dbHost: 'localhost'
}


db.connect(dbConfig, function(err) {
  if (err) {
    console.log(colors.bold.bgRed('Unable to connect to database "' + dbConfig.dbName + '" on "' + dbConfig.dbHost + '"'));
    process.exit(1);
  } else {

    console.log(colors.bold.bgGreen('Connected to database "' + dbConfig.dbName + '" on "' + dbConfig.dbHost + '"'));

    // Create server and listen
    var server = app.listen(8080, function() {
      var serverHost = server.address().address;
      var serverPort = server.address().port;
      console.log(colors.bold.bgGreen(('Listening to ') + (serverHost) + (' on port ') + (serverPort)));
    }); // app.listen

  }
});
