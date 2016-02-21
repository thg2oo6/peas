import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return params;
  },
  setupController: function(controller, model) {
    controller.set('activity', model);
    controller.loadActivity();
  }
});
