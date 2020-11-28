import OzEvents from './OzEvents';

export default class extends OzEvents {
  constructor() {
    super();
    Object.keys(this).forEach((key) => {
      this[key] = window.localStorage.getItem(key) || '';
    });
  }

  viewerId;

  viewerPath;
}
