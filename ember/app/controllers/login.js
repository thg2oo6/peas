import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
        let location = `${window.location.protocol}//${window.location.host}/app`;
        window.location.href = location;
    }
  }
});
