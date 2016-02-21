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

      if (Ember.$.cookie('peas.sid')) {
        this.redirectToDashboard();
      }
  },
  redirectToDashboard: function() {
    let location = `${window.location.protocol}//${window.location.host}/app`;
    window.location.href = location;
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
              success: (response) => {
                Ember.$.removeCookie("peas.sid");
                Ember.$.cookie("peas.sid", response.sid, {
                  path: '/'
                });
                this.redirectToDashboard();
              }
            });
          },
          error: (response) => {
            if (response.status === 400) {
              this.set('errorMessage', "Wrong username or password.");
            } else {
              this.set('errorMessage', "Something went wrong when sending that request.");
            }
          }
        })
    }
  }
});
