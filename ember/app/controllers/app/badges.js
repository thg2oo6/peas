import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  badges: [],

  init: function() {
    this.subscribe();

    this.loadBadgeData();
  },

  loadBadgeData: function() {
    this.get('websocket').send('app.badges.get');
  },

  subscribe: function() {
    this.get('websocket').on('app.badges.get.response', (data) => {
      this.set('badges', data);
    });
  }

});
