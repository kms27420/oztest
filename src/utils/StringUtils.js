import Utils from './Utils';

export default class extends Utils {
  static toObjKeyFromEleId = (eleId) =>
    eleId.replace(
      /[-_][a-zA-Z0-9]*/g,
      (str) => str.substring(1, 2).toUpperCase() + str.substring(2),
    );

  static toEleIdFromObjKey = (objKey) =>
    objKey.replace(/[A-Z0-9]/g, (str) => `-${str}`);
}
