import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  session: Ember.inject.service('session'),
  level: {},

  init: function() {
    this.get('session').setController(this);
    this.subscribe();
  },

  subscribe: function() {
    this.get('websocket').on('settings.levels.post.response', () => {
      this.set('level', {});
      this.transitionToRoute('app.settings.level-management')
    });
  },

  actions: {
    save: function() {
      this.get('websocket').send('settings.levels.post', this.level);
    }
  }
});
