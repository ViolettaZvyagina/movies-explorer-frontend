import './BurgerMenu.css';

function BurgerMenu({ isNavigationPopupOpen, isMain }) {
  return (
    <button
      className={`${isMain ? 'burger-menu_color_pink' : 'burger-menu'}`}
      type="button"
      aria-label="меню"
      onClick={isNavigationPopupOpen}
    >
    </button>
  );
}

export default BurgerMenu;
