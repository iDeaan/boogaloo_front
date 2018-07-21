const validateFields = (fieldKeys, values) => {
  const errors = {};

  const requiredFields = fieldKeys.requiredFields || [];
  const alphaNumberFields = fieldKeys.alphaNumberFields || [];
  const emailFields = fieldKeys.emailFields || [];
  const matchFields = fieldKeys.matchFields || [];
  const alphaFields = fieldKeys.alphaFields || [];
  const minLengthFields = fieldKeys.minLengthFields || [];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Це поле обов\'язкове для заповнення.';
    }
  });

  alphaNumberFields.forEach((field) => {
    if (values[field] && !values[field].match(/^(?:[a-zA-Z]|\d|\.)+$/)) {
      errors[field] = 'Це поле може містити лише числа та букви.';
    }
  });

  emailFields.forEach((field) => {
    if (values[field] && !values[field].match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      errors[field] = 'Введіть правильне email посилання';
    }
  });

  matchFields.forEach((field) => {
    if (values[field.firstItem] !== values[field.secondItem]) {
      errors[field.secondItem] = 'Значення не співпадають.';
    }
  });

  alphaFields.forEach((field) => {
    if (values[field] && !values[field].match(/^[a-zA-Zа-яА-ЯЁёіїєІЇЄ"'-]+$/i)) {
      errors[field] = 'Поле може містити лише букви';
    }
  });

  minLengthFields.forEach((field) => {
    if (values[field.title] && values[field.title].length < field.length) {
      errors[field.title] = `Поле має мітстити більше ніж ${field.length} символів.`;
    }
  });

  return errors;
};

export default validateFields;
