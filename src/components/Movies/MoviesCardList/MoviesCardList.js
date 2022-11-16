import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
// import movies from '../../../utils/Movies';

function MoviesCardList({ /*movieCards,*/ cards, searchMovie, moviesRoute}) {

  return (
    <ul className='movies-card-list'>
      { searchMovie.slice(0, cards).map((movie) => <MoviesCard
        movie={movie}
        key={movie.id || movie._id}
        moviesRoute={moviesRoute}
        />) }
    </ul>
  );
}

export default MoviesCardList;
