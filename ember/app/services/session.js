import Ember from 'ember';

export default Ember.Service.extend({
  websocket: Ember.inject.service('websocket'),
  user: {},
  getUser: function() {
    return this.user;
  },
  _setup: function() {
    this.get('websocket').on('profile.getCurrentUser.response', (response) => {
      this.set('user', response);
    });
    this.get('websocket').send('profile.getCurrentUser');
  }.on('init')
})
