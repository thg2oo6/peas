import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  users: [],

  init: function() {
    this.subscribe();

    this.loadUsers();
  },

  loadUsers: function() {
    this.get('websocket').send('settings.users.get');
  },

  actions: {
    remove: function(user) {
      this.get('websocket').send('settings.users.delete', user);
    }
  },

  subscribe: function() {
    this.get('websocket').on('settings.users.get.response', (users) => {
      this.set('users', users);
    });
  }
});
