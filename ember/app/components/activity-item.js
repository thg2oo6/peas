import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  activity: {},
  earned: [],
  earnedDate: null,

  init: function() {
    this._super(...arguments);
  },

  didReceiveAttrs: function() {
    var badges = this.get('earned');
    var activity = this.get('activity');

    if (activity && badges && badges.length > 0) {
      var count = 0;
        var result = _.find(badges, (item) => {
          return activity.id === item.activityID;
        });

        if (result) {
          this.set('earnedDate', result.earned);
        }

    }
  }
});
