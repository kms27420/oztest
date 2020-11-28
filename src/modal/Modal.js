import { ElementUtils, StringUtils, TypeChecker } from '../utils';

const defaultStyle = {
  position: `absolute`,
  width: `100%`,
  height: `100%`,
  margin: 0,
  padding: 0,
  top: 0,
  left: 0,
  backgroundColor: `rgba(1, 1, 1, 0.1)`,
};

export default class {
  constructor(content, params) {
    if (!params) params = {};
    if (!params.style) params.style = defaultStyle;
    else {
      Object.keys(defaultStyle).forEach((key) => {
        if (!TypeChecker.isUndefined(params.style[key])) return;
        params.style[key] = defaultStyle[key];
      });
    }
    this.#element = ElementUtils.div({
      id: `modal`,
      ...params,
      children: [
        ElementUtils.appendStyle(content, {
          height: `calc(100% - 50px)`,
        }),
        ElementUtils.div({
          id: `modal-bt-pane-parent`,
          style: {
            height: `50px`,
          },
          children: [
            ElementUtils.div({
              id: `modal-bt-pane`,
              style: {
                float: `right`,
                width: `400px`,
                height: `100%`,
              },
              children: [
                ElementUtils.input({
                  id: `modal-close-bt`,
                  type: `button`,
                  value: `Close(Esc)`,
                  heigth: `100%`,
                  onclick: () => this.close(),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  #closeCallback;

  #element;

  #getValue = (parent, result) => {
    if (!result) result = {};
    const { id } = parent;
    if (id) {
      let { value } = parent;
      if (TypeChecker.isUndefined(value))
        value = parent.getAttribute(`value`);
      if (!TypeChecker.isUndefined(value))
        result[StringUtils.toObjKeyFromEleId(id)] = value;
    }
    const { children } = parent;
    for (let i = children.length - 1; i >= 0; i -= 1)
      result = this.#getValue(children[i], result);
    return result;
  };

  open(closeCallback) {
    this.#closeCallback = closeCallback;
    document.body.appendChild(this.#element);
  }

  close() {
    document.body.removeChild(this.#element);
    if (TypeChecker.isFunc(this.#closeCallback))
      this.#closeCallback(this.#getValue(this.#element));
  }
}
