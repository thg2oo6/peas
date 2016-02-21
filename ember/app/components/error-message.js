import Ember from 'ember';

export default Ember.Component.extend({
  message: null,
  classNames: "error-message-container",

  didReceiveAttrs() {
    setTimeout(() => {
      this.set('message', null);
    }, 3500);
  }
});
