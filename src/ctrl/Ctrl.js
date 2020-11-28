import { StringUtils, TypeChecker } from '../utils';

export default class {
  constructor(data) {
    TypeChecker.checkObj(data);
    this.#data = data;
  }

  #data = {};

  get data() {
    return JSON.parse(JSON.stringify(this.#data));
  }

  setData(data) {
    if (
      data &&
      data.target &&
      TypeChecker.instanceof(data.target, HTMLElement)
    ) {
      let { id } = data.target;
      const { value } = data.target;
      id = StringUtils.toObjKeyFromEleId(id);
      if (TypeChecker.isUndefined(this.#data[id])) return;
      this.#data[id] = value;
    } else {
      Object.keys(data || {}).forEach((key) => {
        if (TypeChecker.isUndefined(this.#data[key])) return;
        this.#data[key] = data[key];
      });
    }
    console.log(this.#data);
  }
}
