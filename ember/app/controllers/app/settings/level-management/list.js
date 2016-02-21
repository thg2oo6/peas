import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  session: Ember.inject.service('session'),
  levels: [],

  init: function() {
    this.get('session').setController(this);
    this.subscribe();

    this.loadLevels();
  },

  loadLevels: function() {
    this.get('websocket').send('settings.levels.get');
  },

  actions: {
    remove: function(level) {
      this.get('websocket').send('settings.levels.delete', level);
    }
  },

  subscribe: function() {
    this.get('websocket').on('settings.levels.get.response', (levels) => {
      this.set('levels', levels);
    });
  }
});
