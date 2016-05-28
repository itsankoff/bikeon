'use strict';

var WebSocketChannel = require('./device_server/wsschannel');
var config = require('./device_server/config');
var Device = require('./device');


class Station {
  constructor() {
    // try to connect all the devices
    this.devices = {};
    this.deviceServer = new WebSocketChannel();
    this.deviceServer.onDeviceOpen(this._onDeviceOpen);
    this.deviceServer.onDeviceMessage(this._onDeviceMessage);
    this.deviceServer.onDeviceClose(this._onDeviceClose);
    this.deviceServer.start(config);
  }

  device(id) {
    return this.devices[id];
  }

  _onDeviceOpen(device) {
    console.log('device connected');
  }

  _onDeviceMessage(device, message) {
    console.log('device message', message);
  }

  _onDeviceClose(device) {
    console.log('device closed');
  }
}

module.exports = Station;
