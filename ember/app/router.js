import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('login', {path: '/'});
  this.route('register');
  this.route('signout');
  this.route('app', function () {
    this.route('dashboard', {path: '/'});
    this.route('badges', {path: '/badges'});
    this.route('activities', function () {
      this.route('list', {path: '/'});
      this.route('view', {path: '/view/:id'})
    });


    this.route('settings', function () {
      this.route('user-management', function () {
        this.route('list', {path: '/'});
        this.route('view', {path: '/view/:id'});
        this.route('edit', {path: '/edit/:id'});
      });

      //this.route('plugin-management');

      this.route('level-management', function () {
        this.route('list', {path: '/'});
        this.route('create');
        this.route('edit', {path: '/edit/:id'});
      });
    })
  });
});

export default Router;
