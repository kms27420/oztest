import { RootCtrl, TopPaneCtrl } from './ctrl';
import { TopPane, CenterPane } from './element';
import { ElementUtils } from './utils';

document.body.appendChild(
  ElementUtils.div({
    id: `root`,
    width: `100%`,
    height: `100%`,
    children: [
      new TopPane(new TopPaneCtrl(new RootCtrl())),
      new CenterPane(),
    ],
  }),
);
