import './MoviesCard.css';

function MoviesCard({
  movie,
  moviesRoute,
  savedMoviesRoute,
  onMoviesSaved,
  isMoviesSaved,
  onMoviesDelete,
}) {

  const isSaved = isMoviesSaved.some((cards) => cards.movieId === movie.id);

  function handleAddMovie() {
    onMoviesSaved(movie);
  };

  function handleDeleteMovie() {
    onMoviesDelete(movie);
  };

  function handleMovieDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return `${ hours }ч ${ minutes }м`;
  };

  return (
    <li className="movies-card">
      <a className="movie-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={`${moviesRoute ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}`}/>
      </a>
      <div className="movies-card__info">
        <div className="movies-card__text">
          <h3 className="movies-card__title">{movie.nameRU}</h3>
          <p className="movies-card__duration">{handleMovieDuration(movie.duration)}</p>
        </div>
        {moviesRoute && (
          <button
            type="button"
            aria-label="Сохранить"
            onClick={handleAddMovie}
            className={`${!isSaved ? 'movies-card__button' : 'movies-card__button_active'}`}>
          </button>
          )}
          {savedMoviesRoute && (
          <button
            type="button"
            aria-label="Удалить"
            onClick={handleDeleteMovie}
            className='movies-card__button_type_delete'>
          </button>
          )}
      </div>
    </li>
  );
}

export default MoviesCard;
