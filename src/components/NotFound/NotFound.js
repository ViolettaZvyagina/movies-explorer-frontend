import { useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {

  const history = useHistory();

  function handleBack() {
    history.goBack();
  }

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__button" onClick={handleBack} type="button" aria-label="Назад">Назад</button>
    </section>
  );
}

export default NotFound;
