import EmberRouter from '@ember/routing/router';
import config from 'papermerge/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('documents');
  this.route('about');
  this.route('contact', { path: '/getting-in-touch' });
  this.route('document', { path: '/document/:document_id' });

  this.route('folders', { path: '/folders/' });
  this.route('folder', { path: '/folder/:folder_id' });

  this.route('tags', function () {
    this.route('add');
    this.route('tag', { path: '/:tag_id' });
    this.route('index', { path: '/' });
  });

  this.route('automates', function () {
    this.route('add');
    this.route('automate', { path: '/:automate_id' });
    this.route('index', { path: '/' });
  });

  this.route('not-found', { path: '/*path' });
});
