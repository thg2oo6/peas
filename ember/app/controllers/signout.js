import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    // TODO: delete cookies

    let location = `${window.location.protocol}//${window.location.host}`;
    window.location.href = location;
  }
});
