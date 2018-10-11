exports.BinaryTree = class BinaryTree {
    constructor(comparator = cmp) {
        this.data = {
          value: null,
          left: null,
          right: null
        }
        this.comparator = comparator;
    }

    insert(str) {
      let newObj = {
        value: str,
        left: null,
        right: null
      }
      !this.data.value ? this.data.value = newObj.value : this.data = this.check(newObj,this.data);
    }

    remove(str) {
      this.find(str,this.data)
    }

    height() {
      return this.data.value ?  this.goDeep(this.data) : 0;

    }

    toArray() {
      return this.data.value ? this.goDeepToArray(this.data).split(',') : [];
    }
//---------------------------
    check(newObj,obj) {
      if (!obj) {
        obj = newObj;
        return obj;
      }
      if (obj.value === newObj.value) {
        // new Error(`This tree already contains '${newObj.value}'`)
        throw({message:`This tree already contains '${newObj.value}'`})
      }
      newObj.value < obj.value ? obj.left = this.check(newObj,obj.left) :
       obj.right = this.check(newObj,obj.right)
      return obj
    }

    goDeep(obj) {
      let l=0;
      let r=0;
      obj.left ? l = this.goDeep(obj.left) : l = 0;
      obj.right ? r = this.goDeep(obj.right) : r = 0;
      return l > r ? ++l : ++r
    }

    goDeepToArray(obj) {
      let str = obj.left ? `${this.goDeepToArray(obj.left)},` : '';
      str += obj.value;
      str += obj.right ? `,${this.goDeepToArray(obj.right)}` : '';
      return str
    }
    find(str, obj) {
      if (str === obj.value) {
        this.replace(obj)
      } else if (str < obj.value){
        obj.left ? this.find(str,obj.left) : this.notContain(str);
      } else {
        obj.right ? this.find(str,obj.right) : this.notContain(str);
      }
    }
    replace(obj) {
      if (obj.right) {
          obj.value = obj.right.value;
          this.replaceStep2(obj.right,obj.right.left,false)
          obj.right = obj.right.right
      }else if (obj.left) {
        obj.value = obj.left.value;
        this.replaceStep2(obj.right,obj.left.right,true)
        obj.left = obj.left.left
      }  else {
        obj.value = null;
        obj.left = null;
        obj.right = null
      }
    }
    notContain(str) {
      new Error(`This tree does not contain '${str}'`);
      throw({message:`This tree does not contain '${str}'`})
    }
    replaceStep2(obj,block,flag) {
      let nextObj;
      flag ? nextObj=obj.left : nextObj=obj.right;
      nextObj ? this.replaceStep2(nextObj,block,flag) : this.paste(obj,block,flag)
    }
    paste(obj,block,flag) {
      if (flag) {
        obj.left = block
      } else {
        obj.right = block
      }
    }
};

cmp = function cmp(str1, str2) {
    return str1 < str2;
};
