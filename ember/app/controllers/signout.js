import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  websocket: Ember.inject.service('websocket'),
  init: function() {
    var cookies = $.cookie();
    for(var cookie in cookies) {
       $.removeCookie(cookie);
    }
    this.get('websocket').deauthenticate();
    this.get('session').deauthenticate();

    let location = `${window.location.protocol}//${window.location.host}/`;
    window.location.href = location;
  }
});
