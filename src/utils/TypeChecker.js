import { IllegalArgumentException } from '../exception';
import Utils from './Utils';

export default class extends Utils {
  static isObj(param) {
    return param && typeof param === `object`;
  }

  static checkObj(param, paramName) {
    this.typeCheck(`isObj`, param, paramName);
  }

  static checkNotObj(param, paramName) {
    this.typeCheck(`isNotObj`, param, paramName);
  }

  static isNullableObj(param) {
    return this.isEmpty(param) || this.typeofObj(param);
  }

  static checkNullableObj(param, paramName) {
    this.typeCheck(`isNullableObj`, param, paramName);
  }

  static checkNotNullableObj(param, paramName) {
    this.typeCheck(`isNotNullableObj`, param, paramName);
  }

  static isStr(param) {
    return typeof param === `string`;
  }

  static checkStr(param, paramName) {
    this.typeCheck(`isStr`, param, paramName);
  }

  static checkNotStr(param, paramName) {
    this.typeCheck(`isNotStr`, param, paramName);
  }

  static isNullableStr(param) {
    return this.isEmpty(param) || this.typeofStr(param);
  }

  static checkNullableStr(param, paramName) {
    this.typeCheck(`isNullableStr`, param, paramName);
  }

  static checkNotNullableStr(param, paramName) {
    this.typeCheck(`isNotNullableStr`, param, paramName);
  }

  static isNum(param) {
    return typeof param === `number`;
  }

  static checkNum(param, paramName) {
    this.typeCheck(`isNum`, param, paramName);
  }

  static checkNotNum(param, paramName) {
    this.typeCheck(`isNotNum`, param, paramName);
  }

  static isNullableNum(param) {
    return this.isEmpty(param) || this.typeofNum(param);
  }

  static checkNullableNum(param, paramName) {
    this.typeCheck(`isNullableNum`, param, paramName);
  }

  static checkNotNullableNum(param, paramName) {
    this.typeCheck(`isNotNullableNum`, param, paramName);
  }

  static isFunc(param) {
    return typeof param === `function`;
  }

  static checkFunc(param, paramName) {
    this.typeCheck(`isFunc`, param, paramName);
  }

  static checkNotFunc(param, paramName) {
    this.typeCheck(`isNotFunc`, param, paramName);
  }

  static isNullableFunc(param) {
    return this.isEmpty(param) || this.isFunc(param);
  }

  static checkNullableFunc(param, paramName) {
    this.typeCheck(`isNullableFunc`, param, paramName);
  }

  static checkNotNullableFunc(param, paramName) {
    this.typeCheck(`isNotNullableFunc`, param, paramName);
  }

  static instanceof(param, Clz) {
    return param instanceof Clz;
  }

  static checkInstanceOf(param, Clz, paramName) {
    this.instanceCheck(`instanceof`, param, Clz, paramName);
  }

  static checkInstanceOfNot(param, Clz, paramName) {
    this.instanceCheck(`instanceofNot`, param, Clz, paramName);
  }

  static nullableInstanceof(param, Clz) {
    return this.isEmpty(param) || this.instanceof(param, Clz);
  }

  static checkNullableInstanceOf(param, Clz, paramName) {
    this.instanceCheck(`nullableInstanceof`, param, Clz, paramName);
  }

  static checkNullableInstanceOfNot(param, Clz, paramName) {
    this.instanceCheck(
      `nullableInstanceofNot`,
      param,
      Clz,
      paramName,
    );
  }

  static isNull(param) {
    return param === null;
  }

  static checkNull(param, paramName) {
    this.typeCheck(`isNull`, param, paramName);
  }

  static checkNotNull(param, paramName) {
    this.typeCheck(`isNotNull`, param, paramName);
  }

  static isUndefined(param) {
    return typeof param === `undefined`;
  }

  static checkUndefined(param, paramName) {
    this.typeCheck(`isUndefined`, param, paramName);
  }

  static checkNotUndefined(param, paramName) {
    this.typeCheck(`isNotUndefined`, param, paramName);
  }

  static isEmpty(param) {
    return this.isNull(param) || this.isUndefined(param);
  }

  static checkEmpty(param, paramName) {
    this.typeCheck(`isEmpty`, param, paramName);
  }

  static checkNotEmpty(param, paramName) {
    this.typeCheck(`isNotEmpty`, param, paramName);
  }

  static typeCheck(condKey, param, paramName) {
    const isNegative = condKey.indexOf(`Not`) !== -1;
    condKey = condKey.replace(`Not`, ``);
    const condFunc = this[condKey];

    if (
      (isNegative && condFunc(param)) ||
      (!isNegative && !condFunc(param))
    )
      throw new IllegalArgumentException(
        `${paramName || `param`} must be ${
          isNegative ? `not` : ``
        } ${condKey.replace(`is`, `type of `)}`,
        param,
      );
  }

  static instanceCheck(condKey, param, Clz, paramName) {
    const isNegative = condKey.indexOf(`Not`) !== -1;
    condKey = condKey.replace(`Not`, ``);
    const condFunc = this[condKey];
    if (
      (isNegative && condFunc(param, Clz)) ||
      (!isNegative && !condFunc(param, Clz))
    )
      throw new IllegalArgumentException(
        `${paramName || `param`} must be ${
          isNegative ? `not` : ``
        } instance of ${Clz.name}`,
        param,
      );
  }
}
