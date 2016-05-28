'use strict';

class Device {
  constructor(id) {
    this.id = id;
    this.connected = true;
  }

  lock() {
    return Promise.resolve();
  }

  unlock() {
    return Promise.resolve();
  }

  get status() {
    return this.connected;
  }
}


module.exports = Device;
