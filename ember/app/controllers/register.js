import Ember from 'ember';

export default Ember.Controller.extend({
  httpHost: null,
  user: {
    username: null,
    password: null,
    lastName: null,
    firstName: null,
    email: null
  },
  errorMessage: null,
  init: function() {
      this.httpHost = Ember.getOwner(this).application.httpHost;
  },
  actions: {
    register: function() {
        Ember.$.ajax({
          type: "POST",
          url: `${this.httpHost}/register`,
          data: {
            user: this.user
          },
          beforeSend: () => {
              this.set('errorMessage', null);
          },
          success: () => {
            this.transitionToRoute('/');
          }
        });
    }
  }
});
