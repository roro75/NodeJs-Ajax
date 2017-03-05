var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null,
};

exports.connect = function(dbConfig, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect('mongodb://' + dbConfig.dbHost + ':27017/' + dbConfig.dbName, function(err, db) {

    if (err) {
      return done(err);
    }
    
    db.authenticate("user", "123456", function(err, res) {
      state.db = db;
      done();
    });
  });
};

exports.get = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      if (err) {
        done(err);
      }
    });
  };
};
