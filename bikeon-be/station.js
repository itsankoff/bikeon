'use strict';

var WebSocketChannel = require('./device_server/wsschannel');
var config = require('./config');
var Device = require('./device');


class Station {
  constructor() {
    // try to connect all the devices
    this.devices = {};

    // mock device
    var mockId = '491d8a72-24ea-11e6-b67b-9e71128cae77';
    this.devices[mockId] = new Device(mockId);

    // start service to manage devices
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
