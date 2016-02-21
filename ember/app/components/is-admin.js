import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  user: {},

  init: function() {
      this._super(...arguments);

      this.set('user', this.get('session').getUser());
  }
});
