import { useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../../hooks/UseFormWithValidation';

function SearchForm({onSearch, input, errоr}) {
  const {
    isValid,
    inputValues,
    handleChange,
    setInputValues
  } = useFormWithValidation({});

  useEffect(() => {
    setInputValues({search: input});
  }, [input, setInputValues]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSearch(inputValues.search /*isChecked*/);
    } else {
      errоr('Введите ключевое слово')
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__container" name="search-form">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          name="search"
          required
          value={inputValues.search || ''}
          onChange={handleChange}
         />
        <button className="search-form__button" type="submit" onClick={handleSubmit}></button>
      </form>
      <FilterCheckbox/>
    </section>
  );
}

export default SearchForm;
