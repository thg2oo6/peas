import Ember from 'ember';
import cryptoJS from 'npm:crypto-js';

export default Ember.Component.extend({
  websocket: Ember.inject.service('websocket'),
  user: {
    id: 1,
    name: "Ionel Cusca",
    score: 9001,
    level: "Bosdebos",
    email: "paul@cioan.ca"
  },

  init: function() {
      this._super(...arguments);

      this.get('websocket').send('profile.getCurrentUser');

      this.subscribe();
  },

  subscribe: function() {
      this.get('websocket').on('profile.getCurrentUser.response', (response) => {
        this.set('user', response);
      });
  },

  avatarUrl: Ember.computed('avatarUrl', function() {
      return `http://www.gravatar.com/avatar/${cryptoJS.MD5(this.get('user').email)}.jpg`;
  })
});
