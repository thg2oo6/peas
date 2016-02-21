import Ember from 'ember';

export default Ember.Controller.extend({
  httpHost: null,
  user: {
    username: null,
    password: null
  },
  errorMessage: null,
  init: function() {
      this.httpHost = Ember.getOwner(this).application.httpHost;
  },
  actions: {
    login: function() {
        Ember.$.ajax({
          type: "POST",
          url: `${this.httpHost}/login`,
          data: this.user,
          xhrFields: {
               withCredentials: true
          },
          beforeSend: () => {
              this.set('errorMessage', null);
          },
          success: (data) => {
            Ember.$.ajax({
              url: `${this.httpHost}/getSession`,
              type: "GET",
              xhrFields: {
                   withCredentials: true
              },
              success: function(response) {
                console.log(response);
                Ember.$.cookie("peas.sid", response.sid);
                //let location = `${window.location.protocol}//${window.location.host}/app`;
                //window.location.href = location;
              }
            });
          }
        })
    }
  }
});
