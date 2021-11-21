import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'papermerge/config/environment';


export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = ENV.APP.NAMESPACE;
  host = ENV.APP.HOST;
  @service session;

  buildURL(...args) {
    let ret = super.buildURL(...args);

    if (ret.substr(-1) === '/') {
      return ret;
    }
    return `${ret}/`;
  }

  @computed('session.data.authenticated.token', 'session.isAuthenticated')
  get headers() {
    let _headers = {},
      token;

    if (this.session.isAuthenticated) {
      token = this.session.data.authenticated.token;
      _headers['Authorization'] = `Token ${token}`;
    }

    return _headers;
  }



}
