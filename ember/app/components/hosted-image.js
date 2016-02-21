import Ember from 'ember';

export default Ember.Component.extend({
  src: null,
  httpHost: null,

  init: function() {
    this._super(...arguments);

    this.httpHost = Ember.getOwner(this).application.httpHost;
  }
});
