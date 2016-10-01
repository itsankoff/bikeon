var orm = require('orm');


orm.connect('sqlite://bikeon.db', (err, db) => {
  if (err) {
    console.error('fail to connect', err);
    return;
  }

  console.log('connected to db');
  console.log('installing db');

  var User = db.define('user', {
    name: String,
    uid: String
  });

  var Device = db.define('device', {
    id: Number,
    location: String,
    connected: Boolean,
    last_connected: Date,
    locked: Boolean
  });

  var Email = db.define('email', {
    id: Number,
    email: String
  });
  User.hasMany('devices', Device);

  db.models.user = User;
  db.models.device = Device;
  db.models.email = Email;

  db.drop(() => {
    db.sync(() => {
      console.log('db installed.');
    });
  });
});
