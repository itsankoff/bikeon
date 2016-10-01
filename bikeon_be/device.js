'use strict';

const ALIVE_INTERVAL = 10

class Device {
  constructor(id, connection) {
    this.id = id;
    this.connected = true;
    this.alive = Date.now();
    this.connection = connection;

    this.lockSuccess = null;
    this.lockFail = null;
    this.unlockSuccess = null;
    this.unlockFail = null;
  }

  lock() {
    console.log('device lock called', this.id);
    return new Promise((resolve, reject) => {
      this.connection.send(JSON.stringify({
        type: 'lock',
        device_id: id
      }));

      this.lockSuccess = resolve;
      this.lockFail = reject;
    });
  }

  unlock() {
    console.log('device unlock called', this.id);
    return new Promise((resolve, reject) => {
      this.connection.send(JSON.stringify({
        type: 'unlock',
        device_id: id
      }));

      this.unlockSuccess = resolve;
      this.unlockFail = reject;
    });
  }

  lockCallback(status) {
    if (status) {
      this.lockSuccess();
    } else {
      this.lockFail();
    }

    this.lockSuccess = null;
  }

  unlockCallback(status) {
    if (status) {
      this.unlockSuccess();
    } else {
      this.unlockFail();
    }

    this.unlockSuccess = null;
  }

  get status() {
    return Date.now() - this.alive < ALIVE_INTERVAL;
  }
}

module.exports = Device;
