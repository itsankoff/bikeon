var express    = require('express');        // call express
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');
var protocol = require('./protocol');
var config = require('./config');
var Station = require('./station');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

var db = new sqlite3.Database('./bikeon.db');
var app = express();
var router = express.Router();
var station = new Station();

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/auth', (req, res) => {
  var authData = req.body;
  console.log(authData);
  if (!protocol.validateRequest(authData)) {
    console.log('invalid request');
    res.json(protocol.error(req));
    return;
  }

  console.log('valid request', authData);

  // make the auth with db
  db.all(`SELECT * FROM user WHERE uid=${authData.uid};`, (err, rows) => {
    if (err) {
      console.log('db error', err);
      res.json(protocol.error(req));
    }

    console.log(rows);
    if (!rows || !rows.length) {
      db.run(`INSERT INTO user (name, uid) VALUES(?, ?)`, authData.name, authData.uid, (err) => {
        if (err) {
          console.log('fail to regiser', err);
        } else {
          res.json(protocol.success(req));
        }
      });
    } else {
      res.json(protocol.success(req));
    }

    return;
  });
});

router.post('/lock', (req, res) => {
  var lockData = req.body;
  if (!protocol.validateRequest(lockData)) {
    res.json(protocol.error(req));
    return;
  }

  console.log('valid request', lockData);
  station.device(lockData.device_id).lock().then(() => {
    console.log('device is locked', lockData.device_id);
    //update db
//     if (true) {
      res.json(protocol.success(req));
//     } else {
//       res.json(protocol.error(req));
//     }
  }).catch(() => {
    // TODO: Send approriate response
    res.json(protocol.error(req));
  });
});

router.post('/unlock', (req, res) => {
  var unlockData = req.body;
  if (!protocol.validateRequest(unlockData)) {
    res.json(protocol.error(req));
    return;
  }

  station.device(unlockData.device_id).unlock().then(() => {
    console.log('device is unlocked', unlockData.device_id);
    // get device from device_id
    // try to unlock the device
    // update db
    res.json(protocol.success(req));
  }).catch((err) => {
    res.json(protocol.error(req));
  });
});

router.post('/stream', (req, res) => {
  // not implemented
  res.sjon(protocol.error(req));

  var streamData = req.body;
  if (!protocol.validateRequest(streamData)) {
    res.json(protocol.error(req));
    return;
  }

  // match device_id and uid if they are bundled (lock)
  // send the device to start streaming
  // return ffmpeg url
  if (true) {
    res.json(protocol.success(req));
  }
});

router.post('/subscribe', (req, res) => {
  var subscribeData = req.body;
  if (!protocol.validateRequest(subscribeData)) {
    res.json(protocol.error(req));
    return;
  }

  // make the auth with db
  db.all(`SELECT email FROM email WHERE email='${subscribeData.email}';`, (err, rows) => {
    if (err) {
      console.log('db error', err);
      res.json(protocol.error(req));
    }

    console.log(rows);
    if (!rows || !rows.length) {
      db.run(`INSERT INTO email (email) VALUES(?)`, subscribeData.email, (err) => {
        if (err) {
          console.log('fail to regiser', err);
        } else {
          res.json(protocol.success(req));
        }
      });
    } else {
      res.json(protocol.success(req));
    }

    return;
  });
});

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use('/api', router);
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
