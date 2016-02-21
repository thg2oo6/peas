import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  user: {},

  init: function() {
      this.subscribe();
  },

  loadUser: function() {
    this.get('websocket').send('settings.users.getSingle', { id: this.user.id });
  },

  subscribe: function() {
      this.get('websocket').on('settings.users.getSingle.response', (response) => {
        this.set('user', response);
      });
  },

  actions: {
    submit: function() {
      this.get('websocket').send('settings.users.put', this.user);
    }
  }
});
