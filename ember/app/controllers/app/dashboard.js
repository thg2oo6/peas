import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  dashboardData: [],

  init: function() {
    this.subscribe();

    this.loadDashboardData();
  },

  loadDashboardData: function() {
    this.get('websocket').send('dashboard.get');
  },

  subscribe: function() {
    this.get('websocket').on('dashboard.get.response', (data) => {
      this.set('dashboardData', data);
    });
  }

});
