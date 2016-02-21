import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    Ember.$.removeCookie('peas.sid');
    this.transitionToRoute('/');
  }
});
