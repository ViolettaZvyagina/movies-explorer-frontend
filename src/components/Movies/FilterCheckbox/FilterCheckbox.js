import './FilterCheckbox.css';

function FilterCheckbox({onCheckbox, isChecked}) {

  /*function handleFilterShortMovies() {
    const element = document.querySelector('input[type=checkbox]');
    const isChecked = element.checked;
    onFilterShortMovies(isChecked);
  }*/


  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        id="filter-checkbox"
        type="checkbox"
        name="filter-checkbox"
        onChange={onCheckbox}
        checked={isChecked}
        //onClick={onCheckbox}
        //value={isChecked}
        //onClick={handleFilterShortMovies}
      />
      <label className='filter-checkbox__label' htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
