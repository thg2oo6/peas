import Ember from 'ember';

export default Ember.Controller.extend({
  websocket: Ember.inject.service('websocket'),
  activity: {},

  init: function() {
    this.subscribe();
  },

  loadActivity: function() {
    this.get('websocket').send('app.activities.getSingle', { id: this.activity.id });
  },

  subscribe: function() {
    this.get('websocket').on('app.activities.getSingle.response', (data) => {
      data.activities = [{
          id: 123,
          name: "Full Charge",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut gravida urna. Mauris venenatis nibh augue, et auctor magna feugiat nec. Aliquam erat volutpat. Vivamus semper est tellus, nec placerat sem ultricies vitae. Duis vitae congue magna. Suspendisse sit amet orci a diam lobortis molestie. Mauris sed nisi arcu. Sed nec nibh tortor. Nulla nec aliquam ante.",
          badge: "/images/achievements/helloWorld/logo.png",
          score: 50
      },
      {
          id: 123,
          name: "asd",
          description: "asd",
          badge: "/images/achievements/helloWorld/logo.png",
          score: 50
      },
      {
          id: 123,
          name: "asd",
          description: "asd",
          badge: "/images/achievements/helloWorld/logo.png",
          score: 50
      }];
      this.set('activity', data);
    });
  }
});
