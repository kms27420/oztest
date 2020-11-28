import { ElementUtils } from '../../utils';

export default ({
  formName,
  labelText,
  inputId,
  type,
  value,
  onchange,
}) =>
  ElementUtils.form({
    id: formName,
    name: formName,
    children: [
      ElementUtils.label({
        innerText: labelText,
        for: inputId,
      }),
      ElementUtils.input({
        id: inputId,
        type: type || `text`,
        value,
        onchange,
      }),
    ],
  });
