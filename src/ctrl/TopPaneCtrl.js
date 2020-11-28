import { OzEventsModal, WebLogicModal } from '../modal';
import TopPaneModel from '../model/TopPaneModel';
import { TypeChecker } from '../utils';
import Ctrl from './Ctrl';

export default class extends Ctrl {
  constructor(upperCtrl) {
    super(new TopPaneModel());

    const { startOzViewer, setData } = upperCtrl;
    TypeChecker.checkFunc(startOzViewer, `startOzViewer`);
    TypeChecker.checkFunc(setData, `setData`);
    this.#upperCtrl = { startOzViewer, setData };
  }

  #upperCtrl;

  #ozEventsModal = new OzEventsModal();

  #webLogicModal = new WebLogicModal();

  startOzViewer() {
    this.#upperCtrl.startOzViewer();
  }

  openOzEventsModal() {
    this.#ozEventsModal.open((value) => this.setData(value));
  }

  openWebLogicModal() {
    this.#webLogicModal.open((value) => this.setData(value));
  }
}
