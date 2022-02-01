import { action } from '@ember/object';
import Modifier from 'ember-modifier';


class Rectangle {

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = parseInt(width);
    this.height = parseInt(height);
  }

  intersect(rect) {
    /*
    Returns true if this rectangle intersects with rect.
    Two rectangle intersect if one of them has a point inside other.
    */
    if (this.contains_point(rect.x, rect.y)) {
      return true;
    }

    if (this.contains_point(rect.x + rect.width, rect.y)) {
      return true;
    }

    if (this.contains_point(rect.x + rect.width, rect.y + rect.height)) {
      return true;
    }

    if (this.contains_point(rect.x, rect.y + rect.height)) {
      return true;
    }

    return false;
  }

  contains_point(x, y) {
    /*
      Is point (x, y) inside this rectangle ?
    */
    let x_is_within = false, y_is_within = false;


    if (this.x <= x && x <= this.x + this.width) {
      x_is_within = true;
    }

    if (this.y <= y && y <= this.y + this.height) {
      y_is_within = true;
    }

    return x_is_within && y_is_within;
  }
}


class UISelect {
  /**
    Desktop like select
  **/

  constructor(parent_selector) {
    /***
      x, y coordinates where selection started.
      parent - dom parent element. Selection DOM element
      will be attached to parent and it's coordinates
      will be relative to the parent DOM.
    **/
    // x,y where selection started
    this.start_x = 0;
    this.start_y = 0;
    this.current_x = 0;
    this.current_y = 0;
    this.parent = parent_selector;
    this.select_div = document.getElementById('ui-select');
    this.nodes_arr = Array.from(
      document.getElementsByClassName('node')
    );
  }

  init(x, y) {
    this.start_x = x;
    this.start_y = y;
  }

  show(x, y) {
    this.visibility = 'visible';
    this.top = `${x}px`;
    this.left  = `${y}px`;
  }

  hide() {
    this.visibility = 'hidden';
  }

  update(x, y) {
    let height, width, top, left;


    this.show(x, y);
    this.current_x = x;
    this.current_y = y;

    width = Math.abs(this.current_x - this.start_x);
    height = Math.abs(this.current_y - this.start_y);

    if (this.select_div) {

      if (this.current_y <  this.start_y) {
        this.top = `${this.current_y + 7}px`;
        top = this.current_y + 7;
      } else {
        this.top = `${this.start_y}px`;
        top = this.start_y;
      }
      if (this.current_x <  this.start_x) {
        this.left = `${this.current_x + 7}px`;
        left = this.current_x + 7;
      } else {
        this.left = `${this.start_x}px`;
        left = this.start_x;
      }
      this.width = `${width}px`;
      this.height = `${height}px`;

      const { selected_nodes, unselected_nodes } = this.get_nodes_selection(
        new Rectangle(left, top, width, height)
      );

      this.select_nodes(selected_nodes);
      this.unselect_nodes(unselected_nodes);
    }
  }

  get_nodes_selection(selection_rect) {
    /**
      selection_rect is instance of utils.MgRect
    **/
    let selected_nodes = [], unselected_nodes = [];

    this.nodes_arr.forEach(element => {
      let _r, rect;

      _r = element.getBoundingClientRect();
      rect = new Rectangle(_r.x, _r.y, _r.width, _r.height);

      if (selection_rect.intersect(rect)) {
        selected_nodes.push(element);
      } else {
        unselected_nodes.push(element);
      }
    });

    return {selected_nodes, unselected_nodes};
  }

  select_nodes(elements) {
    let input_el;

    elements.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && !input_el.checked) {
        input_el.click();
      }
    });
  }

  unselect_nodes(elements) {
    let input_el;

    elements.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && input_el.checked) {
        input_el.click();
      }
    });
  }


  deselect_all_nodes() {
    let input_el;

    this.nodes_arr.forEach(element => {
      input_el = element.querySelector('input');
      if (input_el && input_el.checked) {
        input_el.click();
      }
    });
  }

  set width(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.width = value;
  }

  set height(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.height = value;
  }

  set top(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.top = value;
  }

  set left(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.left = value;
  }

  set visibility(value) {
    if (!this.select_div) {
      return;
    }
    this.select_div.style.visibility = value;
  }

}


export default class UISelectModifier extends Modifier {

  ui_select = undefined;

  addEventListener() {
    this.element.addEventListener('mousedown', this.onMouseDown);
    this.element.addEventListener('mouseup', this.onMouseUp);
    this.element.addEventListener('mousemove', this.onMouseMove);
  }

  removeEventListener() {
    this.element.removeEventListener('mousedown', this.onMouseDown);
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mousemove', this.onMouseMove);
  }

  // lifecycle hooks
  didReceiveArguments() {
    this.removeEventListener();
    this.addEventListener();

    this.ui_select = new UISelect(this.element);
  }

  willDestroy() {
    this.removeEventListener();
  }

  @action
  onMouseMove(event) {
    if (!event.buttons) {
      this.hide();
    } else if (this.ui_select) {
      this.ui_select.update(event.clientX, event.clientY);
    }
  }

  @action
  onMouseUp() {
    this.hide();
  }

  @action
  onMouseDown(event) {
    this.ui_select.init(event.clientX, event.clientY);
  }

  hide() {
    if (this.ui_select) {
      this.ui_select.hide();
    }
  }
}
