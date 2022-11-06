import './BurgerMenu.css';

function BurgerMenu({ isNavigationPopupOpen }) {
  return (
    <button
      className="burger-menu"
      type="button"
      aria-label="меню"
      onClick={isNavigationPopupOpen}
    >
    </button>
  );
}

export default BurgerMenu;
