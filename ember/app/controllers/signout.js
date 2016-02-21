import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  init: function() {
    Ember.$.removeCookie('peas.sid');
    this.get('session').deauthenticate();
    this.transitionToRoute('/');
  }
});
