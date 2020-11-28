import { TopPaneCtrl } from '../ctrl';
import { ElementUtils, TypeChecker } from '../utils';
import InputForm from './common/InputForm';

export default (ctrl) => {
  TypeChecker.checkInstanceOf(ctrl, TopPaneCtrl, `ctrl`);

  const { viewerId, viewerPath } = ctrl.data;
  return ElementUtils.div({
    id: `top-pane`,
    children: [
      ElementUtils.div({
        children: [
          new InputForm({
            formName: `viewer-id-form`,
            inputId: `viewer-id`,
            labelText: `Viewer ID: `,
            value: `${viewerId || ''}`,
            onchange: (evt) => ctrl.setData(evt),
          }),
          new InputForm({
            formName: `viewer-path-form`,
            inputId: `viewer-path`,
            labelText: `Viewer Path: `,
            value: `${viewerPath || ''}`,
            onchange: (evt) => ctrl.setData(evt),
          }),
        ],
      }),
      ElementUtils.input({
        id: `oz-events-modal-open-bt`,
        type: `button`,
        value: `Define OZ events callbacks`,
        onclick: () => ctrl.openOzEventsModal(),
      }),
      ElementUtils.input({
        id: `web-logic-modal-open-bt`,
        type: `button`,
        value: `Define web logic`,
        onclick: () => ctrl.openWebLogicModal(),
      }),
      ElementUtils.input({
        id: `oz_start_bt`,
        type: `button`,
        value: `Start OZ viewer`,
        onclick: () => ctrl.startOzViewer(),
      }),
    ],
  });
};
