import Ember from 'ember';

export default Ember.Service.extend({
  websocket: Ember.inject.service('websocket'),
  user: {},

  getUser: function() {
    return this.user;
  },

  isAuthenticated: function() {
    return Object.keys(this.user).length > 0;
  },

  deauthenticate: function() {
    this.set('user', {});
  },

  authenticate: function() {
    this.get('websocket').send('profile.getCurrentUser');
  },

  _setup: function() {
    this.get('websocket').on('profile.getCurrentUser.response', (response) => {
      this.set('user', response);
    });
    this.authenticate();
  }.on('init')
})
