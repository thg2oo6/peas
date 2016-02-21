import Ember from 'ember';

export default Ember.Component.extend({
  count: 0,
  total: 0,
  progress: 0,

  didReceiveAttrs: function() {
    this._super(...arguments);
    var count = this.get('count');
    var total = this.get('total');
    var progress = 0;

    if (count > 0) {
      progress = parseInt(count/total * 100);
    }

    this.set('progress', progress);
  }
});
