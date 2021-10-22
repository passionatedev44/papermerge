import EmberRouter from '@ember/routing/router';
import config from 'papermerge/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');

  this.route('authenticated', { path: '' }, function() {
    this.route('documents');
    this.route('inbox');
    this.route('document', { path: '/document/:document_id' });

    this.route('node', { path: '/node/:node_id' });

    this.route('tags');

    this.route('automates', function () {
      this.route('add');
      this.route('edit', { path: '/:automate_id/edit' });
      this.route('index', { path: '/' });
    });

    this.route('roles', function () {
      this.route('add');
      this.route('edit', { path: '/:role_id/edit' });
      this.route('index', { path: '/' });
    });

    this.route('users', function () {
      this.route('add');
      this.route('edit', { path: '/:user_id/edit' });
      this.route('change_password', { path: '/:user_id/change-password'});
      this.route('index', { path: '/' });
    });

    this.route('groups', function () {
      this.route('index', { path: '/' });
    });
  });

  this.route('not-found', { path: '/*path' });
});
