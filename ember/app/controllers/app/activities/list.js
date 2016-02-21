import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  activities: [],

  init: function() {
    this.subscribe();

    this.loadActivities();
  },

  loadActivities: function() {
    this.get('websocket').send('app.activities.get');
  },

  subscribe: function() {
    this.get('websocket').on('app.activities.get.response', (activities) => {
      this.set('activities', activities);
    });
  }
});
