import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  websocket: Ember.inject.service('websocket'),
  badges: [],

  init: function() {
    this._super(...arguments);
    this.subscribe();
    this.loadBadges();
  },

  subscribe: function() {
    this.get('websocket').on('app.badges.recent', (result) => {
      this.set('badges', result);
    });
  },

  loadBadges: function() {
    this.get('websocket').send('app.badges.getall');
  }

});
