import { useState } from 'react';

function useFormWithValidation() {
  const [isValid, setIsValid] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [inputErrors, setInputErrors] = useState({});

  const handleChange = (e) => {
    const {value, name} = e.target;

    setInputValues({...inputValues, [name]: value});
    setInputErrors({...inputErrors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest("form").checkValidity());
  };

  function resetInputErrors() {
    setInputValues({});
    setInputErrors({});
    setIsValid(false);
  }

  return {isValid, inputValues, handleChange, setInputValues, inputErrors, resetInputErrors};
}

export default useFormWithValidation;