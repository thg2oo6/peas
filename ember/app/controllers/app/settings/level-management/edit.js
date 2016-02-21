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

  loadLevel: function() {
    this.get('websocket').send('settings.levels.getSingle', { id: this.level.id });
  },

  subscribe: function() {
    this.get('websocket').on('settings.levels.getSingle.response', (data) => {
        this.set('level', data);
    });

    this.get('websocket').on('settings.levels.put.response', () => {
      this.set('level', {});
      this.transitionToRoute('app.settings.level-management')
    });

    this.get('websocket').on('settings.levels.put.error', (response) => {
      if(response.name === "ValidationError") {
        this.set('errorMessage', response.error);
      }
    });
  },

  actions: {
    save: function() {
      this.get('websocket').send('settings.levels.put', this.level);
    }
  }
});
