import { IllegalArgumentException } from '../exception';
import TypeChecker from './TypeChecker';
import Utils from './Utils';

export default class extends Utils {
  static create(params) {
    if (!params) params = {};
    const { tagName, children, style, css } = params;
    let { width, height } = params;

    TypeChecker.checkStr(tagName, `tagName`);

    const ele = document.createElement(tagName);

    if (children) {
      let converted = children;

      if (!TypeChecker.instanceof(converted, HTMLElement)) {
        if (Array.isArray(converted)) {
          for (let i = 0; i < converted.length; i += 1)
            if (!TypeChecker.instanceof(converted[i], HTMLElement))
              converted[i] = this.create(converted[i]);
        } else {
          converted = this.create(converted);
        }
      }
      this.appendChildren(ele, converted);
    }

    const converted = { ...style };
    if (TypeChecker.isNum(width)) width += `px`;
    if (TypeChecker.isNum(height)) height += `px`;
    if (TypeChecker.isStr(width)) converted.width = width;
    if (TypeChecker.isStr(height)) converted.height = height;
    this.appendStyle(ele, converted);

    if (TypeChecker.isStr(params.id)) ele.id = params.id;
    this.appendCss(ele, css);

    Object.keys(params).forEach((key) => {
      if ([`tagName`, `children`, `style`, `css`].includes(key))
        return;
      if (!TypeChecker.isUndefined(ele[key])) ele[key] = params[key];
      else ele.setAttribute(key, params[key]);
    });
    return ele;
  }

  static appendStyle(element, style) {
    TypeChecker.checkInstanceOf(element, HTMLElement, `element`);
    if (!style) return element;
    TypeChecker.checkObj(style, `style`);
    Object.keys(style).forEach((key) => {
      element.style[key] = style[key];
    });
    return element;
  }

  static appendChildren(element, children) {
    TypeChecker.checkInstanceOf(element, HTMLElement);
    if (children) {
      if (TypeChecker.instanceof(children, HTMLElement)) {
        element.appendChild(children);
      } else if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i += 1)
          TypeChecker.checkInstanceOf(children[i], HTMLElement);
        children.forEach((child) => element.appendChild(child));
      } else
        throw new IllegalArgumentException(
          `children must be type of HTMLElement, HTMLElement[]`,
          children,
        );
    }
  }

  static appendCss(element, css) {
    if (TypeChecker.isEmpty(css)) return element;
    TypeChecker.checkInstanceOf(element, HTMLElement);
    TypeChecker.checkObj(css);
    let cssKeys = Object.keys(css);
    for (let i = 0; i < cssKeys.length; i += 1)
      TypeChecker.checkObj(css[cssKeys[i]]);

    const copy = { ...css };
    console.log(element.id);
    copy[element.id] = css[element.id] || css[``];
    delete copy[``];
    cssKeys = Object.keys(copy);

    document.head.appendChild(
      this.style({
        innerHTML: cssKeys.reduce((result, cssKey) => {
          const obj = copy[cssKey];
          const objKeys = Object.keys(obj);
          return `${result}
        ${
          cssKey === element.id
            ? `#${cssKey}`
            : `#${element.id} ${cssKey.replace(
                /[,]/g,
                (str) => `${str} #${element.id} `,
              )}`
        } {${objKeys.reduce((objStr, objKey) => {
            return `${objStr}
          ${objKey.replace(
            /[A-Z]/g,
            (str) => `-${str.toLowerCase()}`,
          )}: ${obj[objKey]};`;
          }, ``)}
      }`;
        }, ``),
      }),
    );

    return element;
  }

  static script(params) {
    return this.createTag(`script`, params);
  }

  static style(params) {
    return this.createTag(`style`, params);
  }

  static div(params) {
    return this.createTag(`div`, params);
  }

  static form(params) {
    return this.createTag(`form`, params);
  }

  static table(params) {
    return this.createTag(`table`, params);
  }

  static thead(params) {
    return this.createTag(`thead`, params);
  }

  static tbody(params) {
    return this.createTag(`tbody`, params);
  }

  static tr(params) {
    return this.createTag(`tr`, params);
  }

  static th(params) {
    return this.createTag(`th`, params);
  }

  static td(params) {
    return this.createTag(`td`, params);
  }

  static input(params) {
    return this.createTag(`input`, params);
  }

  static button(params) {
    return this.createTag(`button`, params);
  }

  static datalist(params) {
    return this.createTag(`datalist`, params);
  }

  static textarea(params) {
    return this.createTag(`textarea`, params);
  }

  static label(params) {
    return this.createTag(`label`, params);
  }

  static h1(params) {
    return this.createTag(`h1`, params);
  }

  static h2(params) {
    return this.createTag(`h2`, params);
  }

  static h3(params) {
    return this.createTag(`h3`, params);
  }

  static h4(params) {
    return this.createTag(`h4`, params);
  }

  static p(params) {
    return this.createTag(`p`, params);
  }

  static a(params) {
    return this.createTag(`a`, params);
  }

  static createTag(tagName, params) {
    if (!params) params = {};
    TypeChecker.checkObj(params, `params`);
    params.tagName = tagName;
    return this.create(params);
  }
}
