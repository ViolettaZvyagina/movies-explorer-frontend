import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/Movies';

function MoviesCardList() {
  return (
    <ul className='movies-card-list'>
      { movies.map((movie) => <MoviesCard
        movie={movie}
        key={ movie._id }
        />) }
    </ul>
  );
}

export default MoviesCardList;
