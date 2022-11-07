import { useRouteMatch } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const isMoviesRoute = useRouteMatch({ path: '/movies', exact: false });

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={ movie.image} alt="Изображение" />
      <div className="movies-card__info">
        <div className="movies-card__text">
          <h3 className="movies-card__title">{ movie.nameRU}</h3>
          <p className="movies-card__duration">{ movie.duration }</p>
        </div>
          <button
            type="button"
            aria-label="Лайк"
            className={`${isMoviesRoute ? 'movies-card__button' : 'movies-card__button_type_delete'}`}>
          </button>
      </div>
    </li>
  );
}

export default MoviesCard;
