import { useRouteMatch } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  cards,
  searchMovie,
  moviesMore,
  isMoviesSaved,
  onMoviesSaved,
  onMoviesDelete,
}) {
  const moviesRoute = useRouteMatch({ path: '/movies', exact: false });
  const savedMoviesRoute = useRouteMatch({ path: '/saved-movies', exact: false });

  return (
    <section className='movies-card-list__section'>
      {moviesRoute && (
        <>
      <ul className='movies-card-list'>
        { searchMovie.slice(0, cards).map((movie) => <MoviesCard
          movie={movie}
          key={movie.id || movie._id}
          moviesRoute={moviesRoute}
          savedMoviesRoute={savedMoviesRoute}
          onMoviesSaved={onMoviesSaved}
          isMoviesSaved={isMoviesSaved}
          onMoviesDelete={onMoviesDelete}
          />) }
      </ul>
      <div className={`movies-card-list__more ${
              searchMovie.length >= cards ? 'movies-card-list__more_type_active' : ''
            }`}>
        <button type='button' aria-label='Ещё' className='movies-card-list__more-button' name='movies-more' onClick={moviesMore}>Ещё</button>
      </div>
      </>
      )}
      {savedMoviesRoute && (
      <ul className='movies-card-list'>
        { isMoviesSaved.map((movie) => <MoviesCard
          movie={movie}
          key={movie.id || movie._id}
          moviesRoute={moviesRoute}
          savedMoviesRoute={savedMoviesRoute}
          onMoviesSaved={onMoviesSaved}
          isMoviesSaved={isMoviesSaved}
          onMoviesDelete={onMoviesDelete}
          />) }
      </ul>
      )}
  </section>
  );
}

export default MoviesCardList;
