import Ember from 'ember';

export default Ember.Service.extend({
  websocket: Ember.inject.service('websocket'),
  user: {},
  callback: null,

  getUser: function() {
    return this.user;
  },

  isAuthenticated: function() {
    return Object.keys(this.user).length > 0;
  },

  deauthenticate: function() {
    this.set('user', {});
  },

  authenticate: function(callback) {
    if (!this.isAuthenticated()) {
        this.set('callback', callback);
        this.get('websocket').send('profile.getCurrentUser');
    } else {
        if (typeof callback === 'function') {
            callback(this.getUser());
        }
    }
  },

  setController: function(controller) {
    this.set('controller', controller);
    this.enforceAdminAccess();
  },

  enforceAdminAccess() {
    if (this.user && !this.user.isAdmin && this.controller) {
      this.controller.transitionToRoute('app.dashboard');
    }
  },

  _setup: function() {
    this.get('websocket').on('profile.getCurrentUser.response', (response) => {
      this.set('user', response);
      this.enforceAdminAccess();

      if (typeof this.callback === 'function') {
        this.callback(response);
      }
    });
    this.authenticate();
  }.on('init')
})
