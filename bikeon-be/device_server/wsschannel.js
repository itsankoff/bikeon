'use strict';

var WebSocketServer = require('ws').Server;
var ChannelInterface = require('./channelinterface');
var ChannelConstants = require('./channelconstants');


class WebSocketChannel extends ChannelInterface {
  constructor() {
    super();
    this._peers = [];
  }

  start(config) {
    var ip = config.ip || '0.0.0.0';

    if (config.ssl) {
      var http = require('https');
      var fs = require('fs');
      var sslServer = http.createServer({
        'key': fs.readFileSync(config.ssl_key),
        'cert': fs.readFileSync(config.ssl_cert),
      }, (req, res) => {
        console.log('client connected');
      }).listen(config.station_port, ip);

      this._wss = new WebSocketServer({'server': sslServer});
    } else {
      this._wss = new WebSocketServer({'port': config.station_port, 'ip': ip});
    }

    this._wss.on('connection', peer => {
      console.log('new client');

      this.emit(ChannelConstants.ON_PEER_OPEN, peer);

      peer.on('message', msg => {
        this.emit(ChannelConstants.ON_PEER_DATA, peer, msg);
      });

      peer.on('close', () => {
        this.emit(ChannelConstants.ON_PEER_CLOSE, peer);
      });

      this._peers.push(peer);
    });

    console.log('start listening on ip:port: %s:%d, secure: ', ip, config.station_port, config.ssl);
  }

  stop() {
    this._peers.forEach((peer) => {
      peer.close();
    });

    this._peers = [];
    this._wss.close();
    this._wss = [];

    console.log('stop listening');
  }

  removePeer(peer) {
    this._peers = this._peers.filter(function(currentPeer) {
      if (currentPeer == peer) {
        return false;
      }

      return true;
    });

    peer.close();
  }
}


module.exports = WebSocketChannel;
