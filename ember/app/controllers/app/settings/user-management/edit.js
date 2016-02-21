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
    this.get('websocket').on('settings.users.getSingle.response', (data) => {
      this.set('user', data);
    });

    this.get('websocket').on('settings.users.put.response', () => {
      this.set('user', {});
      this.transitionToRoute('app.settings.user-management')
    });
  },

  actions: {
    save: function() {
      this.get('websocket').send('settings.users.put', this.user);
    }
  }
});
