const validateFields = (fieldKeys, values) => {
  const errors = {};

  const requiredFields = fieldKeys.requiredFields || [];
  const alphaNumberFields = fieldKeys.alphaNumberFields || [];

  requiredFields.map((field) => {
    if (!values[field]) {
      errors[field] = 'Це поле обов\'язкове для заповнення.';
    }
  });

  alphaNumberFields.map((field) => {
    if (values[field] && !values[field].match(/^(?:[a-zA-Z]|\d|\.)+$/)) {
      errors[field] = 'Це поле може містити лише числа та букви.';
    }
  });

  return errors;
};

export default validateFields;
