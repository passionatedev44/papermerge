import Model, { attr, hasMany } from '@ember-data/model';


class ContentTypeModel extends Model {
  @attr app_label;
  @attr model;
  @hasMany('permission') permissions;
}

export default ContentTypeModel;
