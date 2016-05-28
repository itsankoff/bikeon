'use strict';

var Device = require('./device');

class Station {
  constructor(deviceIds) {
    // try to connect all the devices
    this.devices = {};

    deviceIds.forEach((deviceId) => {
      this.devices[deviceId] = new Device(deviceId);
    });

    console.log('inited devices', this.devices);
  }

  device(id) {
    return this.devices[id];
  }
}

module.exports = Station;
