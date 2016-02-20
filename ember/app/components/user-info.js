import Ember from 'ember';
import cryptoJS from 'npm:crypto-js';

export default Ember.Component.extend({
  user: {
    id: 1,
    name: "Ionel Cusca",
    score: 9001,
    level: "Bosdebos",
    email: "paul@cioan.ca"
  },

  avatarUrl: Ember.computed('avatarUrl', function() {
      return `http://www.gravatar.com/avatar/${cryptoJS.MD5(this.get('user').email)}.jpg`;
  })
});
