

export default Ember.Component.extend({
  websocket: Ember.inject.service('websocket'),
  user: {},

  init: function() {
      this._super(...arguments);

      this.subscribe();
      this.get('websocket').send('profile.getCurrentUser');
  },

  subscribe: function() {
      this.get('websocket').on('profile.getCurrentUser.response', (response) => {
        this.set('user', response);
      });
  }
});
