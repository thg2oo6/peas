import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  level: {},

  init: function() {
    this.subscribe();
    this.loadLevel();
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
  },

  actions: {
    save: function() {
      this.get('websocket').send('settings.levels.put', this.level);
    }
  }
});
