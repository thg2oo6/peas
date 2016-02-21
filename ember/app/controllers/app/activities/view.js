import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  activity: {},

  init: function() {
    this.subscribe();
  },

  loadActivity: function() {
    this.get('websocket').send('app.activities.getSingle', { id: this.activity.id });
  },

  subscribe: function() {
    this.get('websocket').on('app.activities.getSingle.response', (data) => {
      this.set('activity', data);
    });
  }
});
