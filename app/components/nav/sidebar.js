import Component from '@glimmer/component';
import { service } from '@ember/service';


export default class SidebarComponent extends Component {
  @service store;

  get pinned_tags() {
    return this.store.findAll('tag').then((tags) => {
      return tags.filter(tag => tag.pinned);
    });
  }
}
