'use strict';

var WebSocketChannel = require('./device_server/wsschannel');
var config = require('./config');
var Device = require('./device');


class Station {
  constructor() {
    // try to connect all the devices
    this.devices = {};

    // start service to manage devices
    this.deviceServer = new WebSocketChannel();
    this.deviceServer.onDeviceOpen(this._onDeviceOpen.bind(this));
    this.deviceServer.onDeviceMessage(this._onDeviceMessage.bind(this));
    this.deviceServer.onDeviceClose(this._onDeviceClose.bind(this));
    this.deviceServer.start(config);
  }

  device(id) {
    return this.devices[id];
  }

  _onDeviceOpen(device) {
    console.log('device connected');
  }

  _onDeviceMessage(connection, data) {
    try {
      var message = JSON.parse(data);
    } catch(e) {
      console.log('device message is not json', data);
      return;
    }

    if (message.type && message.device_id) {
      var deviceId = message.device_id;
      switch(message.type) {
      case 'auth':
        console.log('register device', deviceId);
        this.devices[deviceId] = new Device(deviceId, connection);
        break; 
      case 'alive':
        console.log('update device alive', deviceId);
        var device = this.devices[deviceId];
        if (device) {
          device.alive = Date.now();
        }
        break;
      case 'lock':
        console.log('device lock response', this.id);
        var device = this.devices[deviceId];
        if (device) {
          device.lockCallback(true);
        } else {
          console.log('no such device', deviceId);
        }
        break;
      case 'unlock':
        console.log('device unlock response', this.id);
        var device = this.devices[deviceId];
        if (device) {
          device.unlockCallback(true);
        } else {
          console.log('no such device', deviceId);
        }
        break;
      }
    } else {
      console.log('device invalid message', message);
    }
  }

  _onDeviceClose(connection) {
    var deviceIds = Object.keys(this.devices);
    var closedDevice = null;
    for (var i in deviceIds) {
      var device = this.devices[deviceIds[i]];
      if (device.connection === connection) {
        closedDevice = device;
        break;
      }
    }

    delete this.devices[device.id];
    console.log('device closed', device.id);
  }
}

module.exports = Station;
