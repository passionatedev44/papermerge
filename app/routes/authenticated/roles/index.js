import BaseRoute from 'papermerge/routes/base';
import { inject as service } from '@ember/service';


export default class RolesRoute extends BaseRoute {
  @service store;

  async model() {
    return this.store.findAll('role');
  }
}
