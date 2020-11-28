import { CannotCreateInstanceException } from '../exception';

export default class {
  constructor() {
    throw new CannotCreateInstanceException(
      `This class is util class.`,
    );
  }
}
