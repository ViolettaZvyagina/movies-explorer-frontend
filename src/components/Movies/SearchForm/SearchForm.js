import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__container" name="search-form">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          name="name"
          required
         />
        <button className="search-form__button" type="submit"></button>
      </form>
      <FilterCheckbox/>
    </section>
  );
}

export default SearchForm;
