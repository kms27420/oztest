import { ElementUtils } from '../utils';
import Modal from './Modal';

export default class extends Modal {
  constructor() {
    super(ElementUtils.div({ id: `oz-events-modal` }));
  }
}
