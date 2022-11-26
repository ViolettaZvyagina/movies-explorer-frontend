import './FilterCheckbox.css';

function FilterCheckbox({onCheckbox, isChecked}) {

  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        id="filter-checkbox"
        type="checkbox"
        name="filter-checkbox"
        onChange={onCheckbox}
        checked={isChecked}
      />
      <label className='filter-checkbox__label' htmlFor="filter-checkbox">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
