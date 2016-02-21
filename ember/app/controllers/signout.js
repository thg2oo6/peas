import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    // TODO: delete cookies
    this.transitionToRoute('/');
  }
});
