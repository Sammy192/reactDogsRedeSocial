import React from 'react';

const typesValidation = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Insira um email válido',
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validateField(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (
      typesValidation[type] &&
      !typesValidation[type].regex.test(value)
    ) {
      setError(typesValidation[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validateField(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validateField: () => validateField(value),
    onBlur: () => validateField(value),
  };
};

export default useForm;
