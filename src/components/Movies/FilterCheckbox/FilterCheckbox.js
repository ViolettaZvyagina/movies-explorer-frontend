import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        id="filter-checkbox"
        type="checkbox"
        name="filter-checkbox"
      />
      <label className="filter-checkbox__label" htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
