import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  session: Ember.inject.service('session'),
  level: {},
  errorMessage: null,

  init: function() {
    this.get('session').setController(this);
    this.subscribe();
  },

  subscribe: function() {
    this.get('websocket').on('settings.levels.post.response', () => {
      this.set('level', {});
      this.transitionToRoute('app.settings.level-management')
    });

    this.get('websocket').on('settings.levels.post.error', (response) => {
      if(response.name === "ValidationError") {
        this.set('errorMessage', response.message);
      }
    });
  },

  actions: {
    save: function() {
      this.get('websocket').send('settings.levels.post', this.level);
    }
  }
});
