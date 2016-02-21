import Ember from 'ember';

export default Ember.Component.extend({
  websocket: Ember.inject.service('websocket'),
  badge: {},
  display: false,
  classNameBindings: ['display:display'],

  init: function() {
      this._super(...arguments);

      this.subscribe();
  },

  actions: {
      dismiss: function() {
        this.set('display', false);
        setTimeout(() => {
          this.set('badge', {});
        }, 1200);
      }
  },

  subscribe: function() {
      this.get('websocket').on('badge.earned', (response) => {
          this.set('badge', response);
          this.set('display', true);
      });
  }
});
