'use strict'

var ChannelConstants = require('./channelconstants');
var EventEmitter = require('events').EventEmitter;

class ChannelInterface extends EventEmitter {
  constructor() {
    super();
  }

  start(config) {
    throw 'NotImplementedError';
  }

  stop() {
    throw 'NotImplementedError';
  }

  removePeer() {
    throw 'NotImplementedError';
  }

  /*
  * @params - cb (handler with one param - the connection)
  */ 
  onDeviceOpen(cb) {
    this.on(ChannelConstants.ON_PEER_OPEN, cb);
  }

  /*
  * @params - cb (handler with two param - the connection
  *               and the payload)
  */ 
  onDeviceMessage(cb) {
    this.on(ChannelConstants.ON_PEER_DATA, cb);
  }

  /*
  * @params - cb (handler with one param - the connection)
  */ 
  onDeviceClose(cb) {
    this.on(ChannelConstants.ON_PEER_CLOSE, cb);
  }

  /*
  * @params - cb (handler with one param - the channel instance)
  */ 
  onServerClose(cb) {
    this.on(ChannelConstants.ON_SERVER_CLOSE, cb);
  }
}

module.exports = ChannelInterface;
