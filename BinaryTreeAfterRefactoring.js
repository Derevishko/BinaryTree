class BinaryTree {
  constructor() {
    this.root = new Point();
  }

  // public
  // insert value if in don't exist in tree
  insert(value) {
    this.root = this._insert(value, this.root);
  }
  // insert value if in exist in tree
  remove(value) {
    const point = this._find(value);
    if (point) {
      this._removePoint(point);
    } else {
      throw new Error(`This tree does not contain '${value}'`);
    }
  }
  // get height of tree
  height() {
    return this.root.value ? this._goDeep(this.root) : 0;
  }
  // present tree
  toArray() {
    return this.root.value ? this._toArray(this.root) : [];
  }

  //private
  // find first empty point and fill it by value
  _insert(value, point, parent) {
    if (!point || !point.value) {
      return new Point(parent, value);
    } else if (point.value === value) {
      throw new Error(`This tree already contains '${value}'`);
    } else {
      value > point.value
        ? (point.right = this._insert(value, point.right, point))
        : (point.left = this._insert(value, point.left, point));
      return point;
    }
  }
  // get height by recursion
  _goDeep(point) {
    if (!point) {
      return 0;
    } else {
      return Math.max(this._goDeep(point.left), this._goDeep(point.right)) + 1;
    }
  }
  // recursive create array for tree
  _toArray(point) {
    if (!point || !point.value) {
      return [];
    } else {
      return [].concat(
        this._toArray(point.left),
        [point.value],
        this._toArray(point.right)
      );
    }
  }
  // find point by value in tree
  _find(value, point = this.root) {
    if (!point || !point.value) {
      return null;
    } else if (point.value == value) {
      return point;
    } else if (point.left && point.left.value === value) {
      return point.left;
    } else if (point.right && point.right.value === value) {
      return point.right;
    } else {
      return this._find(value, point.value > value ? point.left : point.right);
    }
  }
  // remove point from tree and replace it right/left/empty point
  _removePoint(point) {
    if (point.right) {
      const pointForPaste = point.left;
      point.value = point.right.value;
      point.left = point.right.left;
      point.right = point.right.right;
      this._replacePointLeft(pointForPaste, point);
    } else if (point.left) {
      const pointForPaste = point.right;
      point.value = point.left.value;
      point.left = point.left.left;
      point.right = point.left.right;
      this._replacePointRight(pointForPaste, point);
    } else {
      point.value = null;
      point.left = null;
      point.right = null;
    }
  }
  // replace left point in point
  _replacePointLeft(pointForPaste, point) {
    if (point.left) {
      this._replacePointLeft(point.left);
    } else {
      point.left = pointForPaste;
    }
  }
  // replace right point in point
  _replacePointRight(pointForPaste, point) {
    if (point.right) {
      this._replacePointRight(point.right);
    } else {
      point.right = pointForPaste;
    }
  }
}

// data structure for BinaryTree
class Point {
  constructor(parent = null, value = null, left = null, right = null) {
    this._parent = parent;
    this._value = value;
    this._left = left;
    this._right = right;
  }

  //public
  get parent() {
    return this._parent;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  get left() {
    return this._left;
  }
  set left(point) {
    this._left = point;
  }
  get right() {
    return this._right;
  }
  set right(point) {
    this._right = point;
  }
}
