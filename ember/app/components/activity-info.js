import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  activity: {},
  badges: [],
  count: 0,

  init: function() {
    this._super(...arguments);
  },

  didReceiveAttrs: function() {
    var badges = this.get('badges');
    var activity = this.get('activity');

    if (activity && badges && badges.length > 0) {
      var count = 0;
      badges.forEach((badge) => {
          var result = _.find(activity.activities, (item) => {
            return badge.activityID === item.id;
          });

          if (result) {
            count += result.score;
          }
      });

      this.set('count', count);
    }
  }
});
