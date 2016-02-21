import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Service.extend({
  _setup: function() {
    let websocketHost = getOwner(this).application.websocketHost;
    let websocketPort = getOwner(this).application.websocketPort;
    let socket = this.socket = io(`${websocketHost}:${websocketPort}`, {
      query: 'session_id=' + Ember.$.cookie('peas.sid')
    });
  }.on('init'),

  send: function(event, payload) {
    event = event || {};
    this.socket.emit(event, payload);
  },

  on: function(event, callback) {
    this.socket.on(event, callback);
  }
})
